export declare enum SocialProvider {
    GOOGLE = "google",
    FACEBOOK = "facebook",
    APPLE = "apple"
}
export declare class SocialAuthDto {
    provider: SocialProvider;
    token: string;
}
export declare class FacebookAuthDto {
    id: string;
    name: string;
    image?: string;
    email?: string;
}
