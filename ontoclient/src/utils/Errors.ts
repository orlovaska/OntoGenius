//interface AppError {
//    message: string; // Сообщение ошибки
//    code?: number; // Дополнительное поле, если требуется код ошибки
//    action?: string; // Действие, которое нужно предпринять для обработки ошибки
//}

export enum AppErrorType {
    NetworkError,
    ServerError,
    NotFound,
    PasswordValidationError,
    EmailValidationError,
    // Добавьте другие типы ошибок по мере необходимости
}

export class AppError {
    constructor(public message: string, public type: AppErrorType, public code?: number) { }
}

// Экспортируйте экземпляры ошибок, если это необходимо
export const passwordValidationError = new AppError("Password validation error", AppErrorType.PasswordValidationError);
export const emailValidationError = new AppError("Email validation error", AppErrorType.EmailValidationError);


