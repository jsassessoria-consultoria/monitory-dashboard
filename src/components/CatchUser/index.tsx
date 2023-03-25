function CatchUser(idUser: string, users: any) {
  const userFilter = users.filter((user:any) => {
    if (user.id == idUser) {
      return user;
    }
  });
  return userFilter[0];
}
export default CatchUser;
