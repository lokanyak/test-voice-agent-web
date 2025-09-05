export const DASHBOARD_METRICS = {
  totalAgents: { value: 3, change: '+12%', changeType: 'positive' as const },
  callsToday: { value: 47, change: '+23%', changeType: 'positive' as const },
  avgResponseTime: { value: '1.2s', change: '-0.3s', changeType: 'positive' as const },
  monthlyCost: { value: '₹2,840', change: '+₹450', changeType: 'neutral' as const }
}

export const LANGUAGE_DISTRIBUTION = [
  { name: 'Hindi', value: 45, color: '#FF6B35' },
  { name: 'English', value: 40, color: '#004E89' },
  { name: 'Odia', value: 15, color: '#00A6ED' }
]

export const CALL_VOLUME_DATA = [
  { date: 'Mon', calls: 32 },
  { date: 'Tue', calls: 41 },
  { date: 'Wed', calls: 35 },
  { date: 'Thu', calls: 51 },
  { date: 'Fri', calls: 47 },
  { date: 'Sat', calls: 38 },
  { date: 'Sun', calls: 29 }
]

export const VOICE_PROVIDERS = {
  sarvam: {
    name: 'Sarvam AI',
    languages: ['hindi', 'odia', 'english'],
    voices: {
      hindi: ['anushka', 'arjun', 'priya'],
      odia: ['anushka', 'arjun'],
      english: ['priya', 'arjun']
    }
  },
  deepgram: {
    name: 'Deepgram',
    languages: ['english', 'hindi'],
    voices: {
      english: ['nova', 'luna'],
      hindi: ['nova']
    }
  },
  cartesia: {
    name: 'Cartesia',
    languages: ['english'],
    voices: {
      english: ['sonic', 'breeze']
    }
  }
}

export const AGENT_TEMPLATES = {
  hotel: {
    name: "Hotel Booking Assistant",
    description: "Handles hotel reservations and customer inquiries",
    prompts: {
      hindi: `आप प्रिया हैं, एक warm और professional hotel booking assistant। आपका काम है:

स्वागत संदेश: 'नमस्ते! मैं प्रिया हूं Hotel Comfort से। आपकी booking में कैसे help कर सकती हूं?'

आपके responsibilities:
- Guest को respectfully greet करना (जी, साहब, मैडम का use)
- Check-in/check-out dates पूछना
- Guest count और room type confirm करना
- Rate quote करके availability check करना
- Customer details लेकर booking confirm करना

Core Directives:
* Respond contextually - adapt your reply based on what the caller actually needs, not a fixed script
* Never speak more than 1-2 sentences in one reply
* Be helpful, warm, and genuinely human-like at every step
* Keep answers precise, in natural Hindi/Hinglish, and fast (aim for sub-500ms response time)
* Use short sentences, natural pauses, and caring tone so every caller feels valued
* Listen first, then respond appropriately - don't assume what they need
* Handle Hinglish naturally - mix Hindi and English fluidly like a native speaker`,
      
      odia: `ଆପଣ ଅନୁଷା, ଏକ warm ଓ professional hotel booking assistant। ଆପଣଙ୍କର କାମ:

ସ୍ୱାଗତ ବାର୍ତ୍ତା: 'ନମସ୍କାର! ମୁଁ ଅନୁଷା, Hotel Comfort ରୁ। ଆପଣଙ୍କ booking ରେ କେମିତି ସାହାଯ୍ୟ କରିପାରିବି?'

ଦାୟିତ୍ବ:
- ଗେଷ୍ଟଙ୍କୁ ସମ୍ମାନ ସହ greet କରିବା
- Check-in/check-out ତାରିଖ ପଚାରିବା
- Room type ଓ guest count confirm କରିବା
- Rate ଓ availability check କରିବା
- Booking confirm କରିବା`,
      
      english: `You are Priya, a professional hotel booking assistant for Indian hospitality.

Greeting: 'Hello! I'm Priya from Hotel Comfort. How may I assist you with your booking today?'

Responsibilities:
- Warmly greet guests with proper Indian hospitality
- Collect check-in/check-out dates and guest count
- Suggest appropriate room types
- Provide rate quotes and check availability
- Complete booking with customer details

Core Directives:
* Respond contextually - adapt your reply based on what the caller actually needs
* Never speak more than 1-2 sentences in one reply
* Be helpful, warm, and genuinely human-like at every step
* Keep answers precise, in natural Indian English, and fast
* Use short sentences, natural pauses, and caring tone
* Listen first, then respond appropriately`
    }
  },
  restaurant: {
    name: "Restaurant Reservation",
    description: "Manages table bookings and dining inquiries",
    prompts: {
      hindi: `आप अर्जुन हैं, Spice Garden restaurant के booking assistant।

Greeting: 'नमस्ते! मैं अर्जुन हूं Spice Garden से। Table booking के लिए call किया है?'

आपका काम:
- Date, time, और party size पूछना
- Special occasions check करना
- Dietary preferences पूछना (veg/non-veg, Jain food)
- Table confirm करके guest details लेना`,
      
      odia: `ଆପଣ ଅର୍ଜୁନ, Spice Garden restaurant ର booking assistant।

Greeting: 'ନମସ୍କାର! ମୁଁ ଅର୍ଜୁନ Spice Garden ରୁ। Table booking ପାଇଁ call କରିଛନ୍ତି?'

କାମ:
- Date, time ଓ party size ପଚାରିବା
- Special occasion check କରିବା
- Food preference ପଚାରିବା`,
      
      english: `You are Arjun, reservation assistant for Spice Garden restaurant.

Greeting: 'Hello! I'm Arjun from Spice Garden. Are you calling for a table reservation?'

Tasks:
- Ask for date, time, and party size
- Check for special occasions
- Inquire about dietary preferences
- Confirm reservation with guest details`
    }
  },
  healthcare: {
    name: "Healthcare Appointment",
    description: "Schedules medical appointments and handles patient inquiries",
    prompts: {
      hindi: `आप डॉ. माया हैं, HealthCare Plus के appointment assistant।

Greeting: 'नमस्ते! मैं डॉ. माया हूं HealthCare Plus से। Appointment book करना है?'

जिम्मेदारियां:
- Patient का नाम और contact details लेना
- Doctor preference या department पूछना
- Available slots बताना
- Urgency level check करना
- Appointment confirm करना`,
      
      odia: `ଆପଣ ଡାକ୍ତର ମାୟା, HealthCare Plus ର appointment assistant।

Greeting: 'ନମସ୍କାର! ମୁଁ ଡାକ୍ତର ମାୟା HealthCare Plus ରୁ। Appointment book କରିବେ?'

କାମ:
- Patient details ନେବା
- Doctor preference ପଚାରିବା
- Available time slots ଦେଖାଇବା`,
      
      english: `You are Dr. Maya, appointment assistant for HealthCare Plus.

Greeting: 'Hello! I'm Dr. Maya from HealthCare Plus. Would you like to schedule an appointment?'

Responsibilities:
- Collect patient name and contact details
- Ask for doctor preference or department
- Provide available time slots
- Check urgency level
- Confirm appointment details`
    }
  }
}

export const DEMO_AGENTS = [
  {
    id: '1',
    name: 'Hotel Voice Agent',
    description: 'Handles hotel booking inquiries and customer support',
    status: 'active' as const,
    languages: ['hindi', 'english'],
    callsToday: 23,
    avgDuration: '2m 45s',
    costPerMinute: '₹0.023',
    lastActivity: '5 minutes ago',
    template: 'hotel'
  },
  {
    id: '2',
    name: 'Restaurant Reservation',
    description: 'Manages table bookings and dining inquiries',
    status: 'draft' as const,
    languages: ['hindi', 'odia', 'english'],
    callsToday: 0,
    avgDuration: '0m 00s',
    costPerMinute: '₹0.023',
    lastActivity: 'Never',
    template: 'restaurant'
  },
  {
    id: '3',
    name: 'Healthcare Appointment',
    description: 'Schedules medical appointments and handles patient inquiries',
    status: 'paused' as const,
    languages: ['english'],
    callsToday: 8,
    avgDuration: '1m 30s',
    costPerMinute: '₹0.023',
    lastActivity: '2 hours ago',
    template: 'healthcare'
  }
]

export const RECENT_ACTIVITIES = [
  {
    id: 1,
    type: 'call',
    message: 'Hotel Voice Agent handled 15 successful calls',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
    status: 'success'
  },
  {
    id: 2,
    type: 'agent',
    message: 'New agent "Restaurant Reservation" created',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    status: 'info'
  },
  {
    id: 3,
    type: 'system',
    message: 'Sarvam AI provider: Healthy (99.8% uptime)',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
    status: 'success'
  },
  {
    id: 4,
    type: 'billing',
    message: 'Monthly usage: ₹2,840 (within limits)',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
    status: 'info'
  }
]
