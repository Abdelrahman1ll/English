export interface UnifiedDialogueLine {
  readonly speaker: string;
  readonly text: string;
  readonly arabic?: string;
  readonly translation?: string;
}

export interface UnifiedConversation {
  readonly id: string | number;
  readonly title: string;
  readonly category?: string;
  readonly description?: string;
  readonly arabicTitle?: string;
  readonly dialogue?: readonly UnifiedDialogueLine[];
  readonly messages?: readonly UnifiedDialogueLine[];
}

export interface Category {
  readonly name: string;
  readonly icon: any;
  readonly color: string;
  readonly bg: string;
}
