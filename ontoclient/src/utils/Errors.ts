//interface AppError {
//    message: string; // ��������� ������
//    code?: number; // �������������� ����, ���� ��������� ��� ������
//    action?: string; // ��������, ������� ����� ����������� ��� ��������� ������
//}

export enum AppErrorType {
    NetworkError,
    ServerError,
    NotFound,
    PasswordValidationError,
    EmailValidationError,
    // �������� ������ ���� ������ �� ���� �������������
}

export class AppError {
    constructor(public message: string, public type: AppErrorType, public code?: number) { }
}

// ������������� ���������� ������, ���� ��� ����������
export const passwordValidationError = new AppError("Password validation error", AppErrorType.PasswordValidationError);
export const emailValidationError = new AppError("Email validation error", AppErrorType.EmailValidationError);


