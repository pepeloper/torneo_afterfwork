export const ranking = (games) => {
  return games.reduce((accumulator, game) => {
    game.users.forEach((user) => {
      const found = accumulator.findIndex(u => u.name === user.name)
      if (found > -1) {
        accumulator[found].total_points_in_favor += user.pivot.points_in_favor
        accumulator[found].total_points_against += user.pivot.points_against
      } else {
        accumulator.push({
          id: user.id,
          name: user.name,
          username: user.username,
          email: user.email,
          total_points_in_favor: user.pivot.points_in_favor,
          total_points_against: user.pivot.points_against,
        })
      }
    });

    return accumulator;
  }, [])
    .sort((a, b) => {
      if (a.total_points_in_favor > b.total_points_in_favor) return -1;
      if (a.total_points_in_favor < b.total_points_in_favor) return 1;

      if (a.total_points_against < b.total_points_against) return -1;
      if (a.total_points_against > b.total_points_against) return 1;

      return 0;
    });
}