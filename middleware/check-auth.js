export default function(context) {
	console.log('[Middleware] Check Auth');
	/* if (process.client) {
		context.store.dispatch('initAuth', null);
	} else {
		context.store.dispatch('initAuth', context.req);
	} */
	context.store.dispatch('initAuth', context.req); // on client context.req will be null anyway
}