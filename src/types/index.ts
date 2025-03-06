export interface NavItem {
  label: string;
  href: string;
}

export interface BlockData {
  id: string;
  timestamp: number;
  transactions: number;
  size: number;
  fee: number;
}

export interface BeaconSignal {
  id: string;
  x: number;
  y: number;
  strength: number;
  type: 'transaction' | 'block' | 'validator';
  timestamp: number;
}
