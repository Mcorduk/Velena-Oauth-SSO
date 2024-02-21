import Client from '../models/client.model';
import clientType from '../types/models/client.type';
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

  async updateClientById(clientId: string, update: Partial<clientType>): Promise<clientType | null> {
    return Client.findByIdAndUpdate(clientId, update, { new: true });
  }

  async deleteClientById(clientId: string): Promise<clientType | null> {
    return Client.findByIdAndDelete(clientId);
  }
}
