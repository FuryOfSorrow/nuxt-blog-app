<template>
	<div class="posts-page">
		<PostList :posts="loadedPosts" />
	</div>
</template>

<script>
	export default {
		/* fetch(context) {
			if (context.store.state.loadedPosts.length > 0) {
				return null;
			}
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve({
						loadedPosts: [
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
						]
					});
				}, 1500);
			})
			.then((data) => {
				context.store.commit('setPosts', data.loadedPosts);
			})
			.catch((e) => {
				context.error(e);
			});
		}, */
		computed: {
			loadedPosts() {
				/* console.log(this.$store); */
				return this.$store.getters.loadedPosts;
			}
		},
		middleware: 'log'
		/* asyncData(context) {
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve({
						loadedPosts: [
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
						]
					});
				}, 1500);
			})
			.then((data) => {
				return data;
			})
			.catch((e) => {
				context.error(e);
			});
		}*/
	};
</script>

<style scoped>
	.posts-page {
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>