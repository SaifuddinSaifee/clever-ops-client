import axios from 'axios';
import { z } from 'zod';

const API_URL = 'http://localhost:3000/api/hubspot';

export const HubSpotContact = z.object({
  id: z.string(),
  email: z.string().email(),
  firstname: z.string().optional(),
  lastname: z.string().optional(),
  company: z.string().optional(),
  phone: z.string().optional(),
  lifecyclestage: z.string().optional(),
  lastmodifieddate: z.string(),
});

export type HubSpotContact = z.infer<typeof HubSpotContact>;

export const hubspotService = {
  initiateOAuth: async () => {
    const response = await axios.get(`${API_URL}/auth/url`);
    return response.data.url;
  },

  getAuthStatus: async () => {
    try {
      const response = await axios.get(`${API_URL}/auth/status`);
      return response.data.isAuthenticated;
    } catch (error) {
      return false;
    }
  },

  getContacts: async (): Promise<HubSpotContact[]> => {
    const response = await axios.get(`${API_URL}/contacts`);
    return z.array(HubSpotContact).parse(response.data);
  },

  disconnect: async () => {
    await axios.post(`${API_URL}/auth/disconnect`);
  }
};