export const API_BASE_URL = 'http://19429ba06ff2.vps.myjino.ru/api';
export const COMMAND_ID = 'unshaven-monkey';

export interface SignUpBody {
  email: string;
  password: string;
  commandId: string;
}

export interface AuthResult {
  token: string;
}

interface ServerErrorItem {
  extensions?: {
    code?: string;
  };
  fieldName?: string;
  message?: string;
}

interface ServerErrors {
  errors?: ServerErrorItem[];
}

export interface SignUpFormErrors {
  general: string[];
  email?: string;
  password?: string;
}

const fallbackError = 'Не удалось зарегистрироваться. Попробуйте позже.';

const errorMessages: Record<string, string> = {
  ERR_ACCOUNT_ALREADY_EXIST: 'Пользователь с таким email уже существует.',
  ERR_FIELD_REQUIRED: 'Обязательное поле не заполнено.',
  ERR_INVALID_PASSWORD: 'Пароль должен быть не короче 8 символов и содержать только допустимые символы.',
  ERR_VALIDATION_ERROR: 'Данные не прошли проверку на сервере.',
  ERR_INTERNAL_SERVER: 'На сервере произошла ошибка. Попробуйте позже.',
};

const isServerErrors = (value: unknown): value is ServerErrors => {
  return Boolean(value && typeof value === 'object' && 'errors' in value);
};

export const parseSignUpErrors = (payload: unknown): SignUpFormErrors => {
  if (!isServerErrors(payload) || !Array.isArray(payload.errors) || payload.errors.length === 0) {
    return { general: [fallbackError] };
  }

  return payload.errors.reduce<SignUpFormErrors>(
    (acc, error) => {
      const code = error.extensions?.code;
      const message = (code && errorMessages[code]) || error.message || fallbackError;

      if (error.fieldName === 'email' || code === 'ERR_ACCOUNT_ALREADY_EXIST') {
        acc.email = message;
        return acc;
      }

      if (error.fieldName === 'password' || code === 'ERR_INVALID_PASSWORD') {
        acc.password = message;
        return acc;
      }

      acc.general.push(message);
      return acc;
    },
    { general: [] }
  );
};

export const signUpRequest = async (body: SignUpBody): Promise<AuthResult> => {
  const response = await fetch(`${API_BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (!response.ok) {
    throw data;
  }

  return data;
};
