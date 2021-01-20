<template>
	<div class="single-post-page">
		<section class="post">
			<h1 class="post-title">{{ loadedPost.title }}</h1>
			<div class="post-details">
				<div class="post-detail">Last updated on: {{ loadedPost.updatedDate | date }}</div>
				<div class="post-detail">Written by {{ loadedPost.author }}</div>
			</div>
			<p class="post-content">{{ loadedPost.content }}</p>
		</section>
		<section class="post-feedback">
			<p>Let me know what you think about the post, sending me a mail to <a href="mailto:waterfury-original@gmail.com">waterfury-original@gmail.com</a>.</p>
		</section>
	</div>
</template>

<script>
	export default {
		asyncData(context) {
			if (context.payload) {
				return {
					loadedPost: context.payload.postData
				};
			}

			return context.app.$axios.$get(`/posts/${context.params.id}.json`)
				.then((data) => {
					return {
						loadedPost:data
					};
				})
				.catch((error) => {
					context.error(error);
				})
			/* setTimeout(() => {
				callback(null, {
					loadedPost: {
						id: '1',
						title: `First Post (ID: ${context.params.id})`,
						previewText: 'This is our first post',
						author: 'Dmitri',
						updatedDate: new Date(),
						content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias laudantium optio, possimus quibusdam aperiam asperiores. Eveniet id accusantium quas ratione incidunt neque ea dolores nisi! Explicabo ducimus in ratione eligendi, aut facere cupiditate expedita. Molestias omnis quidem ullam dicta accusamus illo, repudiandae mollitia officiis? Deleniti iste modi neque ratione totam ipsa cumque, quae amet unde nemo perferendis, enim sed sapiente illo, eaque dignissimos! Distinctio hic praesentium quod iusto velit sed sequi nesciunt aperiam accusantium ratione fuga, qui illo quos officiis laboriosam dignissimos, quis, quidem libero impedit rerum aspernatur quasi reprehenderit nemo! Tenetur sequi sit perferendis inventore qui dignissimos doloremque ipsam.',
						thumbnail: 'https://youmatter.world/app/uploads/sites/2/2019/11/tech-planet.jpg'
					}
				})
			}, 1000); */
		},
		head: {
			title: 'A Blog Post'
		}
	};
</script>

<style scoped>
	.single-post-page {
		padding: 30px;
		text-align: center;
		box-sizing: border-box;
	}

	.post {
		width: 100%;
	}

	@media (min-width: 768px) {
		.post {
			width: 600px;
			margin: auto;
		}
	}

	.post-title {
		margin: 0;
	}

	.post-details {
		padding: 10px;
		box-sizing: border-box;
		border-bottom: 3px solid #ccc;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

	@media (min-width: 768px) {
		.post-details {
			flex-direction: row;
		}
	}

	.post-detail {
		color: rgba(88, 88, 88, 1);
		margin: 0 10px;
	}

	.post-feedback a {
		color: red;
		text-decoration: none;
	}

	.post-feedback a:hover,
	.post-feedback a:active {
		color: salmon;
	}
</style>