const users = [{
  id: 1,
  name: 'Person',
  schoolId: 101
}, {
  id: 2,
  name: 'Person B',
  schoolId: 999
}];

const grades = [{
  id: 1,
  schoolId: 101,
  grade: 86
}, {
  id: 2,
  schoolId: 999,
  grade: 100
}, {
  id: 3,
  schoolId: 101,
  grade: 80
}];

const getUser = (id) => {
  return new Promise((resolve, reject) => {
    const user = users.find((user) => {
      return user.id === id;
    });

    if (user) {
      resolve(user);
    } else {
      reject(`Unable to find user with id of ${id}`);
    }
  });
};

const getGrades = (schoolId) => {
  return new Promise((resolve, reject) => {
    resolve(grades.filter((grade) => {
      return grade.schoolId === schoolId;
    }));
  });
};

const getStatus = (userId) => {
  let uu;
  return getUser(userId).then((user) => {
    uu = user;
    return getGrades(user.schoolId);
  }).then((grades) => {
    let average = 0;
    if (grades.length > 0) {
      average  = grades.map((grade) => grade.grade).reduce((a, b) => {
        return a + b;
      }) / grades.length;
    }
    return `${uu.name} has a ${average}% in the class.`;
  });
};

/* jshint ignore:start */
const getStatusAlt = async (userId) => {
  // throw new Error('this is an error');
  // return 'Mike';
  const user = await getUser(userId);
  const grades = await getGrades(user.schoolId);
  let average = 0;
  if (grades.length > 0) {
    average  = grades.map((grade) => grade.grade).reduce((a, b) => {
      return a + b;
    }) / grades.length;
  }
  return `${user.name} has a ${average}% in the class.`;
};
/* jshint ignore:end */

getStatusAlt(2).then((status) => {
  console.log(status);
}).catch((error) => {
  console.log('mmmmmmmm', error);
});

// getStatusAlt(1333).then((name) => {
//   console.log('mmmmmmmm', name);
// }).catch((error) => {
//   console.log('gggggggg', error);
// });

// getUser(2).then((user) => {
//   console.log(user);
// }).catch((error) => {
//   console.log(error);
// });
//
// getGrades(122).then((grade) => {
//   console.log(grade);
// }).catch((error) => {
//   console.log(error);
// });
//
// getStatus(1).then((status) => {
//   console.log(status);
// }).catch((error) => {
//   console.log(error);
// });
