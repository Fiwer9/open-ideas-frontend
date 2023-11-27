import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {fetchData} from "../../../utils/utils";
import {UserResponse} from "../../../models/response/UserResponse";
import UsersService from "../../../services/UsersService";

export class FetchUsers {
  static useGetUsers() {
    const [isLoading, setIsLoading] = useState(false)
    const [users, setUsers] = useState<UserResponse[]>([])
    useEffect(() => {
      fetchData(setIsLoading, setUsers, UsersService.getUsers)
    }, []);

    return [users, setUsers] as [UserResponse[], Dispatch<SetStateAction<UserResponse[]>>]
  }

  static useGetUsersById(id: number) {
    const [isLoading, setIsLoading] = useState(false)
    const [users, setUsers] = useState<UserResponse>({
      id: 0,
      user_permissions: [],
      username: '',
      password: '',
      likes: [],
      last_name: '',
      last_login: '',
      first_name: '',
      date_joined: '',
      email: '',
      groups: [],
      is_active: false,
      is_staff: false,
      is_superuser: false,
      name: '',
      department: {
        id: 0,
        name: '',
        organization: 0
      }
    })
    useEffect(() => {
      fetchData(setIsLoading, setUsers, UsersService.getCurrentUser, id)
    }, []);

    return [users, setUsers] as [UserResponse, Dispatch<SetStateAction<UserResponse>>]
  }
}
