import { Test } from "@nestjs/testing";
import { authService } from "./auth.service";
import { JwtService } from "@nestjs/jwt";
import { UsersDbService } from "./usersDB.service";
import { User } from "./users.entity";
import { Role } from "src/roles.enum";

describe('authService', () => {
    let authServices: authService

    const mockUser: Omit<User,'id'> = {
        name: 'Fabrizio',
        createAt: '01/01/24',
        password: '1234',
        email: 'fabrizio@gmail.com',
        isAdmin: false
    }
    beforeEach(async () => {
        const mockUsersService: Partial<UsersDbService> = {
            //getUserByEmail: () => Promise.resolve(undefined),
            saveUser: (user: Omit<User, 'id'>): Promise<User> => Promise.resolve({
                ...user,
                isAdmin: false,
                id: '1234-234sd-24bhdf-34gftt'
            })
        };
        const module = await Test.createTestingModule({
            providers: [
                authService,
                JwtService,
                {
                    provide: UsersDbService,
                    useValue: mockUsersService
                }
            ],
        }).compile();
        authServices = module.get<authService>(authService);
    });
    //hacemos un mockuserdbService para no usar la base de datos
    it('Create an instance of AuthService', async () => {
        expect(authServices).toBeDefined();
    });

    it(' signUp() creates user', async () => {
        const user = await authServices.signUp(mockUser);
        expect(user).toBeDefined();
        expect(user.password).not.toEqual(mockUser.password)
    })
})
