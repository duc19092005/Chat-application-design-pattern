// Áp dụng Factory Pattern để dễ dàng mở rộng các nhà cung cấp OAuth2 trong tương lai

import { ISocialProfile, ISocialProvider } from "../../../domain/interfaces/oauth2-provider-interface";
import axios from 'axios';
import { GoogleAuth, OAuth2Client } from "google-auth-library";

export class googleAuthProvider implements ISocialProvider {
    private client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    async getUserProfile(authorzationToken: string): Promise<ISocialProfile> {
        // Flow như này trước tiên fe gửi cái này lên sau đó mình sẽ gọi google api để lấy accessToken
        // Sau đó dùng accessToken để lấy thông tin người dùng từ google
        // Trước hết kiểm tra xem clientID có đc mã hóa chưa
        var clientId = process.env?.GOOGLE_CLIENT_ID;
        var googleRedirectURI = process.env?.GOOGLE_REDIRECT_URI;
        const params = new URLSearchParams();
        if (!clientId) {
            throw new Error("Missing Google Client ID");
        }
        if (!googleRedirectURI) {
            throw new Error("Missing Google Redirect URI");
        }

        params.append("code", authorzationToken);
        params.append("client_id", clientId);
        params.append("redirect_uri", googleRedirectURI);
        params.append("grant_type", "authorization_code");

        const response = await axios.post("https://oauth2.googleapis.com/token" , params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        const accessToken = response.data.access_token;
        
        const profileResponse = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo",{

        });

        const profileData = profileResponse.data;
        const verifyTokenId = await this.verifyTokenId(accessToken, clientId);

        if (!verifyTokenId) {
            throw new Error("Invalid Google Access Token");
        }

        const socialProfile: ISocialProfile = {
            SubId: verifyTokenId['sub'],
            email: profileData.email,
            fullName: profileData.name,
            avatarUrl: profileData.picture,
        };        
    }

    private async verifyTokenId(token: string, clientId: string) {
        const ticket = await this.client.verifyIdToken({
            idToken: token,
            audience: clientId,
        });
        return ticket.getPayload();
    }
}