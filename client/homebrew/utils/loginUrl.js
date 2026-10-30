// Link that signs the user in with Google and brings them back to the current page
const loginUrl = ()=>{
	const here = typeof window === 'undefined' ? '/' : `${window.location.pathname}${window.location.search}`;
	return `/auth/google?redirect=${encodeURIComponent(here)}`;
};

export default loginUrl;
