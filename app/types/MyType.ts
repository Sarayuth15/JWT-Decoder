export interface JwtPayload {
    exp?: number,
    iat?: number,
    [key: string]: any
}

export interface Props {
    language: string,
    setLanguage: (lang: string) => void
}

export interface ExpiredAlertType {
    isExpired: boolean;
    textExpired: string;
    textValid: string;
}

export interface TokenSectionsType {
    tokenParts: string[];
    header: any;
    payload: any;
    t: any;
}

export interface TokenSectionsType {
    tokenParts: string[];
    header: any;
    payload: any;
    t: any;
}

export interface SignatureVerifierType {
    token: string
}