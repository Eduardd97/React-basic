// ----------------------- Users ----------------------- \\

export type Users = {
    email: string;
    password: string;
    name: string;
    age: number;
};

export type APIUserType = {
    email: string;
    name: string;
    phone: string;
};

export type UserVariationsType = "local" | "server";

export type UsersProps = {
    users: Users[] | APIUserType[];
};

// --------------------- Todos --------------------------- \\

export type TodosType = {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
};

// export type ApiTodosType = {
//   userId: number;
//   id: number;
//   title: string;
//   completed: boolean;
// };

export type TodosProps = {
    todos: TodosType[];
};

export type TodoVariationsType = "local" | "server";
