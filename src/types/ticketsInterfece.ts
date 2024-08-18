export interface TicketType {
  id: number;
  name: string;
  price: number;
  quantity: number;
  description: string;
  salePeriod: [string, string];
  validPeriod: [string, string];
  minPurchase: number;
  maxPurchase: number;
}

export interface TicketProps {
  ticket: TicketType;
  showEditModal: (ticket: TicketType) => void;
}

export interface TicketsExtraProps {
  tickets: TicketType[];
  addTicket: (ticket: TicketType) => void;
  updateTicket: (ticket: TicketType) => void;
}

export interface EditModalProps {
  ticket: TicketType | null;
  updateTicket: (ticket: TicketType) => void;
  addTicket: (ticket: TicketType) => void;
  closeModal: () => void;
  isEditing: boolean;
}
