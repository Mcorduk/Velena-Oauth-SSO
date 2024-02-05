import Client from '../models/client.model';
import clientType from '../types/models/clientType';
import { generateClientId, generateClientSecret } from '../utils/crypto';

export class ClientService {
  async createClient(name: string, redirectUrl: string, description?: string): Promise<clientType> {
    const clientId = generateClientId();
    const clientSecret = generateClientSecret();
    const newClient = new Client({ clientId, clientSecret, name, redirectUrl, description });
    await newClient.save();
    return newClient;
  }

  async findClientById(clientId: string): Promise<clientType | null> {
    return Client.findById(clientId);
  }

  // Add more methods as needed (update client, delete client, etc.)
}
