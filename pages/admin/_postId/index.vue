<template>
	<div class="admin-post-page">
		<section class="update-form">
			<AdminPostForm :post="loadedPost" @submit="onSubmitted" />
		</section>
	</div>
</template>

<script>
	import AdminPostForm from '@/components/Admin/AdminPostForm';

	export default {
		layout: 'admin',
		middleware: ['check-auth', 'auth'],
		components: {
			AdminPostForm
		},
		/* data() {
			return {
				loadedPost: {
					author: 'Dmitri',
					title: 'My awesome post',
					content: 'Super amazing text, you really should read it full!',
					thumbnailLink: 'https://youmatter.world/app/uploads/sites/2/2019/11/tech-planet.jpg'
				}
			};
		}, */
		asyncData(context) {
			return context.app.$axios.$get(`/posts/${context.params.postId}.json`)
				.then((data) => {
					return {
						loadedPost: {
							...data,
							id: context.params.postId
						}
					};
				})
				.catch((error) => {
					context.error(error);
				});
		},
		methods: {
			onSubmitted(editedPost) {
				this.$store.dispatch('editPost', editedPost)
					.then(() => {
						this.$router.push('/admin');
					});
			}
		}
	};
</script>

<style scoped>
	.update-form {
		width: 90%;
		margin: 20px auto;
	}

	@media (min-width: 768px) {
		.update-form {
			width: 500px;
		}
	}
</style>