export const API_PATH = {
    saveLeaveRequest:'http://localhost:8080/request-user',
    typeAll:'http://localhost:8080/type-all',
    dataRequest:'http://localhost:8080/request-all',
    dataBalance:'http://localhost:8080/balance-all',
    dataDepartment:'http://localhost:8080/department-user-all',
    updateRequest: (id: string | number) => `http://localhost:8080/leave-requests/${id}`
}