import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Client } from '@hubspot/api-client';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const hubspot = new Client();
let hubspotTokens = null;

// HubSpot OAuth endpoints
app.get('/api/hubspot/auth/url', (req, res) => {
  const redirectUri =
    'https://sb1pbygf1-fpyv-js73r9mr--5173--34c588ed.local-credentialless.webcontainer.io/';
  const scopes =
    '&scope=oauth&optional_scope=crm.objects.contacts.write%20crm.objects.companies.write%20crm.objects.invoices.read%20crm.objects.companies.read%20crm.lists.read%20crm.objects.leads.read%20crm.objects.contacts.read';
  const authUrl =
    `https://app.hubspot.com/oauth/authorize` +
    `?client_id=${process.env.HUBSPOT_CLIENT_ID}` +
    `&redirect_uri=${redirectUri}` +
    `${scopes}`;

  res.json({ url: authUrl });
});

app.get('/api/hubspot/auth/callback', async (req, res) => {
  const { code } = req.query;

  try {
    const tokens = await hubspot.oauth.tokensApi.createToken(
      'authorization_code',
      code,
      process.env.HUBSPOT_CLIENT_ID,
      process.env.HUBSPOT_CLIENT_SECRET,
      `${process.env.APP_URL}/api/hubspot/auth/callback`
    );

    hubspotTokens = tokens;
    hubspot.setAccessToken(tokens.accessToken);

    // Redirect to the frontend integrations page
    res.redirect(`${process.env.FRONTEND_URL}/integrations`);
  } catch (error) {
    console.error('HubSpot auth error:', error);
    res.redirect(`${process.env.FRONTEND_URL}/integrations?error=auth_failed`);
  }
});

app.get('/api/hubspot/auth/status', (req, res) => {
  res.json({
    isAuthenticated: !!hubspotTokens,
    expiresAt: hubspotTokens?.expiresAt,
  });
});

app.get('/api/hubspot/contacts', async (req, res) => {
  if (!hubspotTokens) {
    return res.status(401).json({ error: 'Not authenticated with HubSpot' });
  }

  try {
    const { results } = await hubspot.crm.contacts.basicApi.getPage(
      100,
      undefined,
      undefined,
      undefined,
      ['email', 'firstname', 'lastname', 'company', 'phone', 'lifecyclestage']
    );

    const contacts = results.map((contact) => ({
      id: contact.id,
      email: contact.properties.email,
      firstname: contact.properties.firstname,
      lastname: contact.properties.lastname,
      company: contact.properties.company,
      phone: contact.properties.phone,
      lifecyclestage: contact.properties.lifecyclestage,
      lastmodifieddate: contact.updatedAt,
    }));

    res.json(contacts);
  } catch (error) {
    console.error('HubSpot API error:', error);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

app.post('/api/hubspot/auth/disconnect', (req, res) => {
  hubspotTokens = null;
  res.status(200).json({ message: 'Disconnected from HubSpot' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
