// =============================================================================
// Tatva UI Components - Extracted from Sarvam Design System
// =============================================================================

// Utility functions
export { cn, getCSSVariable, getCSSVariableAsHex, rgbToHex } from "./lib/utils";

// Icon Provider
export { IconProvider } from "./lib/icon-context";
export type {
  ExtendedIconComponents,
  HugeIconType,
  IconProviderProps,
} from "./lib/icon-context";

// Button
export { Button, ButtonGroup, buttonVariants } from "./components/Button";
export type {
  ButtonGroupItem,
  ButtonGroupProps,
  ButtonProps,
  ButtonVariants,
} from "./components/Button";

// Text
export { Text, textVariants } from "./components/Text";
export type { TextProps } from "./components/Text";

// Input
export { Input, inputContainerVariants } from "./components/Input";
export type { InputProps } from "./components/Input";

// Badge
export { Badge, badgeVariants } from "./components/Badge";
export type { BadgeProps } from "./components/Badge";

// Tag
export { Tag, tagVariants } from "./components/Tag";
export type { TagProps } from "./components/Tag";

// Chip
export { Chip, chipVariants } from "./components/Chip";
export type { ChipProps } from "./components/Chip";

// Switch
export { Switch } from "./components/Switch";
export type { SwitchProps } from "./components/Switch";

// Checkbox
export { Checkbox } from "./components/Checkbox";
export type { CheckboxProps } from "./components/Checkbox";

// Radio
export { Radio, RadioGroup, useRadioGroup } from "./components/Radio";
export type { RadioGroupProps, RadioProps } from "./components/Radio";

// Textarea
export { Textarea } from "./components/Textarea";
export type { TextareaProps } from "./components/Textarea";

// Select
export { Select } from "./components/Select";
export type { SelectOption, SelectProps } from "./components/Select";

// Card
export { Card, cardVariants } from "./components/Card";
export type { CardBadge, CardProps } from "./components/Card";

// Avatar
export {
  Avatar,
  AvatarGroup,
  avatarGroupVariants,
  avatarVariants,
} from "./components/Avatar";
export type {
  AvatarGroupItem,
  AvatarGroupProps,
  AvatarProps,
} from "./components/Avatar";

// Tabs
export { Tabs, tabsListVariants, tabsTriggerVariants } from "./components/Tabs";
export type { TabItem, TabsProps } from "./components/Tabs";

// Header
export { Header } from "./components/Header";
export type { HeaderProps } from "./components/Header";

// Table
export { Table } from "./components/Table";
export type {
  QuickFilterConfig,
  TableAction,
  TableColumn,
  TableProps,
} from "./components/Table";

// Dialog
export { Dialog, dialogContentVariants } from "./components/Dialog";
export type { DialogAction, DialogProps } from "./components/Dialog";

// Sheet
export { Sheet, sheetContentVariants } from "./components/Sheet";
export type { SheetAction, SheetProps } from "./components/Sheet";

// Form
export { Form } from "./components/Form";
export type {
  FormFieldConfig,
  FormFieldType,
  FormProps,
} from "./components/Form";

// Tooltip
export {
  Tooltip,
  TooltipProvider,
  tooltipContentVariants,
} from "./components/Tooltip";
export type { TooltipProps, TooltipProviderProps } from "./components/Tooltip";

// EmptyState
export { EmptyState } from "./components/EmptyState";
export type {
  EmptyStateAction,
  EmptyStateProps,
} from "./components/EmptyState";

// Skeleton
export { Skeleton } from "./components/Skeleton";
export type { SkeletonProps } from "./components/Skeleton";

// Sidebar
export { Sidebar, SidebarProvider, useSidebar } from "./components/Sidebar";
export type {
  SidebarAccount,
  SidebarMenuGroup,
  SidebarHeaderProps,
  SidebarMenuItem,
  SidebarProfileAction,
  SidebarProfileProps,
  SidebarProps,
} from "./components/Sidebar";

// Menu
export { Menu } from "./components/Menu";
export type { MenuOption, MenuProps } from "./components/Menu";

// MetricCard
export { MetricCard, metricCardVariants } from "./components/MetricCard";
export type { MetricCardProps } from "./components/MetricCard";

// Icon
export {
  Icon,
  getIconComponent,
  iconNames,
  iconSizeMap,
  iconVariants,
} from "./components/Icon";
export type { BuiltInIconName, IconName, IconProps } from "./components/Icon";

// TagInput
export { TagInput, tagInputContainerVariants } from "./components/TagInput";
export type { TagInputProps } from "./components/TagInput";

// Breadcrumbs
export {
  Breadcrumbs,
  breadcrumbItemVariants,
  breadcrumbsVariants,
  separatorVariants,
  slashVariants,
} from "./components/Breadcrumbs";
export type {
  BreadcrumbItem,
  BreadcrumbsComponentProps,
  BreadcrumbsProps,
} from "./components/Breadcrumbs";

// KeyValue
export {
  KeyValue,
  KeyValueGroup,
  keyValueGroupVariants,
  keyValueLabelVariants,
  keyValueValueVariants,
  keyValueVariants,
} from "./components/KeyValue";
export type {
  KeyValueComponentProps,
  KeyValueGroupComponentProps,
  KeyValueGroupProps,
  KeyValueProps,
} from "./components/KeyValue";

// List (Enhanced for LMS)
export { List, ListGroup, listItemVariants } from "./components/List";
export type {
  ListBadge,
  ListGroupProps,
  ListProps,
  ListStatus,
} from "./components/List";

// Accordion (Enhanced for LMS)
export {
  Accordion,
  AccordionItem,
  AccordionRoot,
} from "./components/Accordion";
export type {
  AccordionBadge,
  AccordionItemProps,
  AccordionProps,
  SingleAccordionProps,
} from "./components/Accordion";

// Slider
export { Slider } from "./components/Slider";
export type { SliderProps } from "./components/Slider";

// Divider
export { Divider, dividerVariants } from "./components/Divider";
export type { DividerProps } from "./components/Divider";

// Loader
export { Loader, loaderVariants } from "./components/Loader";
export type { LoaderProps } from "./components/Loader";

// Stepper
export { Stepper, stepperVariants, trackVariants } from "./components/Stepper";
export type { StepperProps, StepperStep } from "./components/Stepper";

// ChatInput
export { ChatInput, chatInputVariants } from "./components/ChatInput";
export type { ChatInputProps } from "./components/ChatInput";

// DatePicker
export { DatePicker, DateRangePicker } from "./components/DateRangePicker";
export type {
  DatePickerProps,
  DatePickerRangeProps,
  DatePickerSingleProps,
  DateRange,
} from "./components/DateRangePicker";

// AnnouncementBanner
export { AnnouncementBanner } from "./components/AnnouncementBanner";
export type { AnnouncementBannerProps } from "./components/AnnouncementBanner";

// AssetContainer
export {
  AssetContainer,
  assetContainerVariants,
} from "./components/AssetContainer";
export type { AssetContainerProps } from "./components/AssetContainer";

// Toast
export {
  ToastContent,
  Toaster,
  toast,
  toastContainerVariants,
  toastIconContainerVariants,
} from "./components/Toast";
export type {
  ToastOptions,
  ToasterProps,
  ToastVariant,
} from "./components/Toast";

// FileUpload
export { FileUpload, fileUploadVariants } from "./components/FileUpload";
export type { FileUploadProps } from "./components/FileUpload";

// Filters
export { Filters } from "./components/Filters";
export type {
  FilterCondition,
  FilterFieldConfig,
  FilterFieldType,
  FilterOperator,
  FiltersProps,
} from "./components/Filters";

// Navbar
export { Navbar, navbarVariants, navItemVariants } from "./components/Navbar";
export type { NavbarProps, NavItem } from "./components/Navbar";
