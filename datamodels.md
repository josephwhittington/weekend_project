user {
    username: unique string required
    displayName: string required
    password: string required
    membershipDate: datetime required generated
}

route data expected
authBody {
    username: string
    password: string
}