export function getExample() {
  return {
    status: "error",
    message: "Internal server error",
    data: [
      {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
      },
      {
        id: 2,
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
      },
    ]
  }
}