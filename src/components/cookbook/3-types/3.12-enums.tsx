
// Problem: TypeScript enums are a nice abstraction, but they seem to behave very 
// differently compared to the rest of the type system.

// Solution: Use them sparingly, prefer const enums, know their caveats, 
// and maybe choose union types instead.

enum Status { 
    Admin = "Admin", 
    User = "User", 
    Moderator = "Moderator",
};

enum Roles {
    Admin = "Admin",
    User = "User",
    Moderator = "Moderator"
}

// function closeThread(threadId: number, status: Status) {
// }
function closeThread(threadId: number, status: Status, roles: Roles) {

}
// closeThread(10, "Admin")
closeThread(10, Status.Admin, Roles.Admin)


closeThread(10, Status.Admin, Roles.Admin)


type StatusTwo = "Admin" | "User" | "Moderator"
function closeThreadTwo(threadId: number, status: StatusTwo) {

}
closeThreadTwo(10, "Admin")