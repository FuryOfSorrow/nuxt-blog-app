import Vuex from 'vuex';
import Cookie from 'js-cookie';



const createStore = () => {
	return new Vuex.Store({
		state: {
			loadedPosts: [],
			token: null
		},
		mutations: {
			setPosts(state, posts) {
				state.loadedPosts = posts;
			},
			addPost(state, post) {
				state.loadedPosts.push(post);
			},
			editPost(state, editedPost) {
				const postIndex = state.loadedPosts.findIndex(
					(el) => el.id === editedPost.id
				);
				state.loadedPosts[postIndex] = editedPost;
			},
			setToken(state, token) {
				state.token = token;
			},
			clearToken(state) {
				state.token = null;
			}
		},
		actions: {
			nuxtServerInit(vuexContext, context) {
				return context.app.$axios.$get('/posts.json')
					.then((data) => {
						const postsArray = [];

						for (let key in data) {
							postsArray.push({
								id: key,
								...data[key]
							});
						}

						vuexContext.commit('setPosts', postsArray);
					})
					.catch((error) => {
						context.error(error);
					});
				/* return new Promise((resolve, reject) => {
					setTimeout(() => {
						vuexContext.commit('setPosts', [
							{
								id: '1',
								title: 'First Post',
								previewText: 'This is our first post',
								thumbnail: 'https://youmatter.world/app/uploads/sites/2/2019/11/tech-planet.jpg'
							},
							{
								id: '2',
								title: 'Second Post',
								previewText: 'This is our second post',
								thumbnail: 'https://youmatter.world/app/uploads/sites/2/2019/11/tech-planet.jpg'
							}
						]);
						resolve();
					}, 1500);
				}); */
			},
			addPost(vuexContext, post) {
				const createdPost = {
					...post,
					updatedDate: new Date()
				};
				return this.$axios.$post(`/posts.json?auth=${vuexContext.state.token}`, createdPost)
					.then((data) => {
						vuexContext.commit('addPost', {
							...createdPost,
							id: data.name
						});
					})
					.catch((error) => {
						console.log(error);
					});
			},
			editPost(vuexContext, editedPost) {
				return this.$axios.$put(`/posts/${editedPost.id}.json?auth=${vuexContext.state.token}`,
					editedPost)
					.then((res) => {
						vuexContext.commit('editPost', editedPost);
					})
					.catch((error) => {
						console.error(error);
					});
			},
			setPosts(vuexContext, posts) {
				vuexContext.commit('setPosts', posts);
			},
			authenticateUser(vuexContext, authData) {
				let authUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.fbAPIKey}`;

				if (!authData.isLogin) {
					authUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.fbAPIKey}`;
				}

				return this.$axios.$post(
					authUrl,
					{
						email: authData.email,
						password: authData.password,
						returnSecureToken: true
					}
				)
					.then((result) => {
						vuexContext.commit('setToken', result.idToken);
						localStorage.setItem('token', result.idToken);
						localStorage.setItem('tokenExpiration', new Date().getTime() + Number.parseInt(result.expiresIn) * 1000);
						Cookie.set('jwt', result.idToken);
						Cookie.set('expirationDate', new Date().getTime() + Number.parseInt(result.expiresIn) * 1000);

						return this.$axios.$post(
							'http://localhost:3000/api/track-data',
							{ data: 'Authenticated!' }
						);
					})
					.catch((error) => {
						console.error(error);
					});
			},
			initAuth(vuexContext, req) {
				let token, expirationDate;

				if (req) {
					if (req.headers.cookie) {
						return;
					}

					const jwtCookie = req.headers.cookie
						.split(';')
						.find((el) => {
							if (el.trim().startsWith('jwt='))
								return el;
						});
					
					if (!jwtCookie) {
						return;
					}

					token = jwtCookie.split('=')[1];
					expirationDate = req.headers.cookie
						.split(';')
						.find((el) => {
							if (el.trim().startsWith('expirationDate='))
								return el;
						})
						.split('=')[1];
				} else if (process.client) {
					token = localStorage.getItem('token');
					expirationDate = localStorage.getItem('tokenExpiration');
				} else {
					token = null;
					expirationDate = null;
				}

				if (new Date().getTime() > +expirationDate || !token) {
					console.log('No token or invalid token');
					vuexContext.dispatch('logout');
					return;
				}

				vuexContext.commit('setToken', token);
			},
			logout(vuexContext) {
				vuexContext.commit('clearToken');
				Cookie.remove('jwt');
				Cookie.remove('expirationDate');
				if (process.client) {
					localStorage.removeItem('token');
					localStorage.removeItem('tokenExpiration');
				}
			}
		},
		getters: {
			loadedPosts(state) {
				return state.loadedPosts;
			},
			isAuthenticated(state) {
				return state.token !== null;
			}
		}
	});
};

export default createStore;