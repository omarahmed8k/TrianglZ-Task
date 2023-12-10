let registerForNotifications = async () => {
  let previousToken = await localStorage.getItem("pushToken");
  if (previousToken) return;
  else {
    let { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

    if (status !== "granted") return;
  }
};
export default registerForNotifications;
