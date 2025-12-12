using SubletUC.Objects;

namespace SubletUC.Services
{
    public class UserSessionService
    {
        // This is your "Global Variable"
        public User? CurrentUser { get; private set; }

        // An event to notify components when the user changes (so the UI updates)
        public event Action? OnChange;

        public void SetUser(User user)
        {
            CurrentUser = user;
            NotifyStateChanged();
        }

        public void ClearUser()
        {
            CurrentUser = null;
            NotifyStateChanged();
        }

        private void NotifyStateChanged() => OnChange?.Invoke();
    }
}