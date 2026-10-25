// All copy lives here so the page components stay small.
// Facts are SparkTG's own claims from sparktg.com, read on 24 October 2026.

export const terms = {
  cloud: {
    label: 'Cloud telephony',
    def: 'A phone setup that runs over the internet instead of physical office phones and wires.',
  },
  api: {
    label: 'WhatsApp Business API',
    def: "WhatsApp's official way for companies to message customers at scale, with a verified business profile.",
  },
  bot: {
    label: 'Bot',
    def: "A bot that understands a customer's question and replies on its own. It passes the customer to a person when it can't help.",
  },
  crm: {
    label: 'CRM',
    def: "Customer relationship management software. It's where a business keeps its customer and lead records, for example HubSpot, Salesforce or Zoho.",
  },
  ivr: {
    label: 'IVR menu',
    def: 'Interactive voice response: the automated menu a caller hears first, such as press 1 for billing, press 2 for support.',
  },
  routing: {
    label: 'Routing',
    def: 'Sending each call to the right person or team automatically, for example by language, topic or who is free.',
  },
  masking: {
    label: 'Call masking',
    def: "Customers and agents see a temporary number instead of each other's real numbers.",
  },
}

export const nav = [
  { id: 'how', label: 'How it works' },
  { id: 'products', label: 'What you get' },
  { id: 'who', label: "Who it's for" },
  { id: 'proof', label: 'Numbers' },
  { id: 'talk', label: 'Talk to us' },
]

export const chat = [
  { from: 'caller', text: 'Hi, has my order shipped?' },
  { from: 'bot', text: "Yes. It's out for delivery and should reach you by 6 pm today." },
  { from: 'bot', text: 'Want the tracking link on WhatsApp?' },
  { from: 'caller', text: 'Yes please.' },
  { from: 'bot', text: 'Sent. Anything else?' },
]

export const basics = [
  { title: 'Calls', text: 'A phone system that runs over the internet, so your team needs no phone hardware.', term: 'cloud', ask: "What's cloud telephony?" },
  { title: 'WhatsApp', text: 'WhatsApp messages sent and received from your business, such as order updates.', term: 'api', ask: "What's the Business API?" },
  { title: 'Assistants', text: 'Assistants that answer routine questions by voice or text, at any hour.', term: 'bot', ask: "What's a bot?" },
]

export const steps = [
  { title: 'Connect what you already use', text: ['Link your phone number, WhatsApp and tools like your ', { term: 'crm' }, '.'] },
  { title: 'Choose where each request goes', text: ['Decide what callers hear in the ', { term: 'ivr' }, ', and which requests go to an assistant or your team.'] },
  { title: 'Let assistants take the routine', text: ['Order status, appointment times and common questions are answered automatically. People handle the rest.'] },
  { title: 'See how it went', text: ["Calls are recorded and scored, and reports show wait times and outcomes, so you can fix what isn't working."] },
]

export const products = [
  { name: 'Cloud contact centre', text: ['Your team takes and makes calls from a browser, with ', { term: 'routing', text: 'routing' }, ', recording and reports.'] },
  { name: 'Call menus', text: ['The menu callers hear first ("press 1 for billing"), set up to send them to the right place.'] },
  { name: 'WhatsApp for business', text: ['Send and receive WhatsApp messages at scale, such as order updates and booking confirmations.'] },
  { name: 'Voice and chat assistants', text: ['Answer routine questions by voice or text, any hour of the day.'] },
  { name: 'Mobile apps', text: ['Suno for field sales and support teams (Android). SparkTG Agent for contact-centre agents (Android and iOS).'] },
  { name: 'Click to call and masking', text: ['Start a call in one tap, and keep personal numbers private on both sides. ', { term: 'masking', text: "What's masking?" }] },
  { name: 'Call insights', text: ["Calls are scored for quality and sentiment, so you can see what's working and what isn't."] },
]

export const sectors = [
  { name: 'Education', text: 'Answer admission enquiries and follow up on the ones you missed.' },
  { name: 'Healthcare', text: 'Send appointment reminders and route patients to the right desk.' },
  { name: 'Travel and hospitality', text: 'Share booking confirmations and itinerary updates on WhatsApp.' },
  { name: 'E-commerce', text: 'Answer order and delivery questions without a queue.' },
]

export const stats = [
  { value: '500+', label: 'companies use it' },
  { value: '50M+', label: 'calls handled a month' },
  { value: '24h', label: 'to set up, with support day and night' },
]

export const tools = ['HubSpot', 'Zendesk', 'Salesforce', 'Zoho', 'Freshdesk', 'LeadSquared', 'Pipedrive', 'Shopify']

export const changes = [
  { problem: 'It felt too technical', fix: 'Headlines use everyday words, and technical terms come second.' },
  { problem: 'Hard to scroll and navigate', fix: 'Fewer, shorter sections and a five-link menu that stays at the top.' },
  { problem: "The model wasn't explained", fix: "A four-step \"how it works\" and a plain list of what you get. Pricing isn't on the current site either, so there's none here; SparkTG would add one." },
  { problem: 'Too much jargon', fix: 'Underlined words open a short definition without leaving the page.' },
]
