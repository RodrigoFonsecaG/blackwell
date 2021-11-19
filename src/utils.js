module.exports = {
  age: function (timestamp) {
    const today = new Date();
    const birthDate = new Date(timestamp);

    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();

    if (month < 0 || (month == 0 && today.getDate() <= birthDate.getDate())) {
      age = age - 1;
    }

    return age;
  },

  date: function (timestamp) {
    const date = new Date(timestamp);
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    const year = date.getUTCFullYear();

    function zeroDate(n) {
      return n < 10 ? '0' + n : '' + n;
    }

    return {
      iso: `${year}-${zeroDate(month)}-${zeroDate(day)}`,
      birthday: `${zeroDate(day)}/${zeroDate(month)}`
    };
  },

  grade: function (grade) {
    const studentYear = grade.replace(/[a-zA-z]/g, '');
    const studentClass = grade.replace(/\d/g, '');

    if (studentClass === 'EF') {
      return `${studentYear}º ano do ensino fundamental`;
    } else {
      return `${studentYear}º ano do ensino médio`;
    }
  }
};
