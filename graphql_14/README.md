## NestJS GraphQL + TypeORM with MongoDB

<details><summary>http://localhost:3000/graphql</summary>

```
mutation CreateStudent {
  createStudent(CreateStudentInput: { firstName: "Tom", lastName: "Hardy" }) {
    id
    firstName
    lastName
  }
}

query Students {
  students {
    id
    firstName
    lastName
  }
}

query Student {
  student(id: "520e8dff-47c8-454b-9ccf-c9a6909880b7") {
    firstName
    lastName
  }
}

mutation CreateLesson {
  createLesson(
    createLessonInput: {
      name: "JS"
      startDate: "2023-05-08T03:00:00.000Z"
      endDate: "2023-05-08T03:40:00.000Z"
    }
  ) {
    id
    name
    startDate
    endDate
    students {
      firstName
      lastName
    }
  }
}

query Lessons {
  lessons {
    id
    name
    startDate
    endDate
    students {
      firstName
      lastName
    }
  }
}

query Lesson {
  lesson(id: "4edc5f39-6152-46b7-982a-c975b3fac1f3") {
    name
    startDate
    endDate
    students {
      firstName
      lastName
    }
  }
}

mutation AssignStudentsToLesson {
  assignStudentsToLesson(
    assignStudentsToLessonInput: {
      lessonId: "4edc5f39-6152-46b7-982a-c975b3fac1f3"
      studentIds: ["520e8dff-47c8-454b-9ccf-c9a6909880b7"]
    }
  ) {
    name
    startDate
    endDate
    students {
      firstName
      lastName
    }
  }
}
```

</details>