const useAuthUI = () => {
  const getAuthTitle = (isLogin) =>
    isLogin
      ? "Welcome back! Sign in to continue"
      : "Join Workflow — organize your life";

  const getPasswordPlaceholder = (isLogin) =>
    isLogin ? "Enter password" : "Create strong password";

  const getButtonText = (isLogin) => (isLogin ? "Sign In" : "Create Account");

  const getToggleText = (isLogin) => ({
    prompt: isLogin ? "Don't have an account? " : "Already have an account? ",
    link: isLogin ? "Sign Up" : "Sign In",
  });

  return {
    getAuthTitle,
    getPasswordPlaceholder,
    getButtonText,
    getToggleText,
  };
};

export { useAuthUI };
