// ============================================================================
// Icon Library - Design System Icon Registry
// ============================================================================
// Generic names mapped to HugeIcons. To change icon library:
// 1. Update imports below
// 2. Update iconComponents mapping
//
// EXTENDING ICONS IN CONSUMER PROJECTS:
// Wrap your app with IconProvider to add custom icons:
//
//   import { IconProvider } from "@sarvam/tatva";
//   import { RocketIcon, SpaceshipIcon } from "@hugeicons/core-free-icons";
//
//   <IconProvider extend={{ rocket: RocketIcon, spaceship: SpaceshipIcon }}>
//     <App />
//   </IconProvider>
//
// Then use them anywhere: <Icon name="rocket" /> or <Button icon="rocket" />
// ============================================================================

import {
  Activity04Icon,
  AiMagicIcon,
  AlertCircle,
  AlertTriangle,
  AngryBirdIcon,
  AppleIcon,
  ArrowDown,
  ArrowLeft,
  ArrowRight02Icon,
  ArrowUp,
  ArrowUp02Icon,
  ArrowUpRight01Icon,
  AttachmentIcon,
  AudioBook01Icon,
  Briefcase01Icon,
  Calendar03Icon,
  Chatting01Icon,
  CheckCircle,
  CheckSquare,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Clock02Icon,
  CloudUploadIcon,
  Copy01Icon,
  CustomerService02Icon,
  Delete03Icon,
  DiscordIcon,
  Download,
  ExternalLink,
  FavouriteIcon,
  File02Icon,
  Filter,
  FilterHorizontalIcon,
  GiftIcon,
  GithubIcon,
  GoogleIcon,
  Home09Icon,
  InformationCircleIcon,
  InstagramIcon,
  Invoice01Icon,
  Key01Icon,
  Layers01Icon,
  LockIcon,
  LayoutTwoColumnIcon,
  Linkedin02Icon,
  LinkSquare02Icon,
  Loading03Icon,
  Logout05Icon,
  MailAtSign01Icon,
  Menu,
  Mic02Icon,
  MicrosoftIcon,
  Minus,
  MoreHorizontal,
  MoreVertical,
  NewTwitterIcon,
  NewsIcon,
  NoteIcon,
  PauseIcon,
  PencilEdit01Icon,
  PieChartIcon,
  Plant01Icon,
  PlayIcon,
  Plus,
  ReloadIcon,
  Search,
  Settings01Icon,
  ShuffleIcon,
  SidebarLeftIcon,
  SortingAZ01Icon,
  SortingZA01Icon,
  SourceCodeIcon,
  SpeechToTextIcon,
  SquareIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
  Tick02Icon,
  Tv01Icon,
  UnfoldMoreIcon,
  ViewIcon,
  ViewOffSlashIcon,
  VolumeHighIcon,
  Wallet03Icon,
  X,
  YoutubeIcon,
} from "@hugeicons/core-free-icons";

// Re-export context utilities from separate file (avoids bundling issues)
export {
  IconProvider,
  useIconContext,
  type ExtendedIconComponents,
  type IconProviderProps,
} from "./icon-context";

/**
 * Icon name mapping - generic names to implementation
 * These are semantic icons required by design system components.
 * Add new icons here when needed (requires PR to design system)
 */
export const iconComponents = {
  // ===========================================================================
  // Navigation
  // ===========================================================================
  "arrow-left": ArrowLeft, // Header (back button)
  "arrow-right": ArrowRight02Icon, // DateRangePicker (date range indicator)
  "arrow-up": ArrowUp, // Table (sort ascending indicator)
  "arrow-down": ArrowDown, // Table (sort descending indicator)
  "chevron-left": ChevronLeft, // Table pagination (previous page)
  "chevron-right": ChevronRight, // Breadcrumbs, Table pagination (next page)
  "chevron-up": ChevronUp, // Input (number increment)
  "chevron-down": ChevronDown, // Accordion, Input, Select, SidebarProfile (expand/collapse)
  "arrow-up-right": ArrowUpRight01Icon,

  // ===========================================================================
  // Actions
  // ===========================================================================
  plus: Plus, // ChatInput, DateRangePicker (add action)
  minus: Minus, // Checkbox (select-all partial state)
  close: X, // Input, Filters, AnnouncementBanner, ChatInput, Chip, Toast, Dialog (dismiss/clear)
  check: Tick02Icon, // List, Listbox (selected state)
  delete: Delete03Icon, // ChatInput, FileUpload (remove item)
  download: Download, // Table toolbar (export button)
  upload: CloudUploadIcon, // FileUpload (upload state indicator)
  search: Search, // Table, Input (search functionality)
  filter: Filter, // Available for filter buttons
  "filter-horizontal": FilterHorizontalIcon, // Filters (add filter button)
  refresh: ReloadIcon, // Available for refresh actions

  // ===========================================================================
  // UI
  // ===========================================================================
  menu: Menu, // Available for menu triggers
  "more-horizontal": MoreHorizontal, // Card, Table, Header, MetricCard (overflow menu trigger)
  "more-vertical": MoreVertical, // Available for vertical overflow menus
  "layout-2-column": LayoutTwoColumnIcon, // Table toolbar (column visibility toggle)
  "external-link": ExternalLink, // Available for external link indicators
  "link-square": LinkSquare02Icon, // SidebarItem (external link indicator)
  "sidebar-left": SidebarLeftIcon, // SidebarHeader (collapse/expand toggle)

  // ===========================================================================
  // Feedback
  // ===========================================================================
  info: InformationCircleIcon, // KeyValue, MetricCard (tooltip trigger)
  warning: AlertTriangle, // Toast, feedback states
  error: AlertCircle, // FileItem (error state), Toast
  success: CheckCircle, // Toast, feedback states

  // ===========================================================================
  // Loading
  // ===========================================================================
  loader: Loading03Icon, // Button (loading state), Toast (loading variant)

  // ===========================================================================
  // Date/Time
  // ===========================================================================
  calendar: Calendar03Icon, // DateRangePicker (trigger button)
  checkbox: CheckSquare, // Available for checkbox indicators

  // ===========================================================================
  // Chat/Input
  // ===========================================================================
  microphone: Mic02Icon, // ChatInput (voice recording trigger)
  attachment: AttachmentIcon, // ChatInput (file attachment trigger)
  send: ArrowUp02Icon, // ChatInput (submit button)
  "chevron-up-down": UnfoldMoreIcon, // Available for expand/collapse toggles
  stop: SquareIcon, // ChatInput (stop recording/generation)
  "ai-magic": AiMagicIcon, // SidebarNewChatButton, ChatInput commands

  // ===========================================================================
  // Media
  // ===========================================================================
  play: PlayIcon, // ChatInput (play audio preview)
  pause: PauseIcon, // ChatInput (pause audio preview)

  // ===========================================================================
  // Visibility
  // ===========================================================================
  eye: ViewIcon, // Input (password visibility - show)
  "eye-off": ViewOffSlashIcon, // Input (password visibility - hide)

  // ===========================================================================
  // Files
  // ===========================================================================
  file: File02Icon, // FileItem, ChatInput (file indicator)

  // ===========================================================================
  // API Dashboard Sidebar Icons
  // ===========================================================================
  home: Home09Icon,
  "speech-to-text": SpeechToTextIcon,
  "sorting-ascending": SortingAZ01Icon,
  "sorting-descending": SortingZA01Icon,
  "chat-multiple": Chatting01Icon,
  key: Key01Icon,
  lock: LockIcon,
  "pie-chart": PieChartIcon,
  invoice: Invoice01Icon,
  wallet: Wallet03Icon,
  code: SourceCodeIcon,
  docs: NoteIcon,

  // ===========================================================================

  gift: GiftIcon,
  copy: Copy01Icon,
  favourite: FavouriteIcon,
  like: ThumbsUpIcon,
  dislike: ThumbsDownIcon,
  plant: Plant01Icon,
  activity: Activity04Icon,
  support: CustomerService02Icon,
  logout: Logout05Icon,
  settings: Settings01Icon,
  history: Clock02Icon,
  shuffle: ShuffleIcon,
  "pencil-edit": PencilEdit01Icon,
  "angry-bird": AngryBirdIcon,
  layers: Layers01Icon,
  "volume-high": VolumeHighIcon,
  edit: PencilEdit01Icon,
  discord: DiscordIcon,
  email: MailAtSign01Icon,
  google: GoogleIcon,
  microsoft: MicrosoftIcon,
  apple: AppleIcon,
  github: GithubIcon,
  chat: Chatting01Icon,
  briefcase: Briefcase01Icon,
  "audio-book": AudioBook01Icon,
  news: NewsIcon,
  television: Tv01Icon,

  // Social Media Icons
  linkedin: Linkedin02Icon,
  twitter: NewTwitterIcon,
  instagram: InstagramIcon,
  youtube: YoutubeIcon,
} as const;

/** Built-in icon names from the design system */
export type BuiltInIconName = keyof typeof iconComponents;

/**
 * Icon name type - accepts built-in icons (with autocomplete) or
 * extended icons registered via IconProvider (any string).
 */
export type IconName = BuiltInIconName | (string & {});

/** List of all available built-in icon names */
export const iconNames = Object.keys(iconComponents) as BuiltInIconName[];

/** Icons that should animate (spin) */
export const LOADER_ICONS: BuiltInIconName[] = ["loader"];

/**
 * Get the underlying icon component for advanced usage
 * @param name - Built-in icon name from the design system
 * @returns The icon component or undefined if not found
 */
export function getIconComponent(name: BuiltInIconName) {
  return iconComponents[name];
}

export type HugeIcon = (typeof iconComponents)[keyof typeof iconComponents];

/**
 * Resolve an icon by name, checking extended icons first, then built-in icons.
 * Used internally by the Icon component.
 */
export function resolveIcon(
  name: string,
  extendedIcons: Record<string, any> | null
): HugeIcon | undefined {
  // Check extended icons first (allows overriding built-in icons)
  if (extendedIcons && name in extendedIcons) {
    return extendedIcons[name];
  }
  // Fall back to built-in icons
  if (name in iconComponents) {
    return iconComponents[name as BuiltInIconName];
  }
  return undefined;
}
