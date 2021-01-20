const bodyParser = require('body-parser');
const axios = require('axios');



export default {
	mode: 'universal',

	// Global page headers (https://go.nuxtjs.dev/config-head)
	head: {
		title: 'WD Blog',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: 'My cool Web Development Blog' }
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
			{ rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap' }
		]
	},

	// Global CSS (https://go.nuxtjs.dev/config-css)
	css: [
		'~assets/styles/main.css'
	],

	// Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
	plugins: [
		'~plugins/core-components.js',
		'~plugins/date-filter.js'
	],

	// Auto import components (https://go.nuxtjs.dev/config-components)
	components: true,

	// Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
	buildModules: [
	],

	// Modules (https://go.nuxtjs.dev/config-modules)
	modules: [
		'@nuxtjs/axios'
	],
	axios: {
		baseURL: process.env.BASE_URL || 'https://nuxt-blog-bf3b8-default-rtdb.firebaseio.com',
		credentials: false
	},

	// Build Configuration (https://go.nuxtjs.dev/config-build)
	build: {
	},

	loading: {
		color: 'rgba(50, 180, 150, 1)',
		height: '4px',
		duration: 5000
	},

	env: {
		baseUrl: process.env.BASE_URL || 'https://nuxt-blog-bf3b8-default-rtdb.firebaseio.com',
		fbAPIKey: 'AIzaSyA3lcCCrD21f7LunoFeOu_cGCmEvP4AuKI'
	},

	//rootDir: '/',

	/* router: {
		base: '/my-app',
		extendRoutes(routes, resolve) {
			router.push({
				path: '*',
				component: resolve(__dirname, '/pages/index.vue')
			})
		},
		linkActiveClass: 'active',
		middleware: 'log'
	}, */

	//srcDir: 'client-app/',

	pageTransition: {
		name: 'fade',
		mode: 'out-in'
	},

	serverMiddleware: [
		bodyParser.json(),
		'~/api'
	],

	/* generate: {
		routes: function() {
			return axios.get('https://nuxt-blog-bf3b8-default-rtdb.firebaseio.com/posts.json')
				.then((res) => {
					const routes = [];

					for (const key in res.data) {
						routes.push({
							route: '/posts/' + key,
							payload: { postData: res.data[key] }
						});
					}

					return routes;
				});
		}
	} */
}