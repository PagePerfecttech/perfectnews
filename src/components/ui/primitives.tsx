/**
 * Primitive UI components for the Perfect News design system.
 * Every page and feature must use these instead of raw HTML elements.
 *
 * Design tokens:
 *   - Border radius: rounded-xl (default), rounded-2xl (cards), rounded-full (pills)
 *   - Font weight: font-medium (body), font-semibold (labels), font-bold (headings)
 *   - Spacing: p-3 (compact), p-4 (default), p-6 (spacious)
 */

import React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

// ─── Button ───────────────────────────────────────────────────────────────────

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: LucideIcon;
  loading?: boolean;
}

const buttonStyles: Record<ButtonVariant, string> = {
  primary: "bg-black text-white hover:bg-gray-800 shadow-sm border border-transparent",
  secondary: "bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 shadow-sm",
  ghost: "bg-transparent text-gray-600 hover:bg-gray-100/80 hover:text-gray-900",
  danger: "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 hover:text-red-700",
};

const buttonSizes: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-xs gap-1.5",
  md: "px-5 py-2.5 text-sm gap-2",
  lg: "px-8 py-3.5 text-sm gap-2.5",
};

export function Button({
  variant = "primary",
  size = "md",
  icon: Icon,
  loading,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center font-semibold rounded-xl transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none",
        buttonStyles[variant],
        buttonSizes[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" />
      ) : Icon ? (
        <Icon className="w-4 h-4" />
      ) : null}
      {children}
    </button>
  );
}

// ─── Input ────────────────────────────────────────────────────────────────────

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: LucideIcon;
  error?: string;
}

export function Input({
  label,
  icon: Icon,
  error,
  className,
  id,
  ...props
}: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="space-y-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-semibold text-gray-500 uppercase tracking-wide"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        )}
        <input
          id={inputId}
          className={cn(
            "w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium outline-none transition-all shadow-sm",
            "focus:ring-4 focus:ring-gray-100 focus:border-gray-400",
            "placeholder:text-gray-400",
            Icon && "pl-11",
            error && "border-red-300 focus:ring-red-200",
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <p className="text-xs text-red-500 font-medium">{error}</p>
      )}
    </div>
  );
}

// ─── TextArea ─────────────────────────────────────────────────────────────────

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function TextArea({ label, error, className, id, ...props }: TextAreaProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">
          {label}
        </label>
      )}
      <textarea
        id={inputId}
        className={cn(
          "w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium outline-none transition-all resize-none shadow-sm",
          "focus:ring-4 focus:ring-gray-100 focus:border-gray-400",
          "placeholder:text-gray-400",
          error && "border-red-300 focus:ring-red-200",
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
    </div>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: "sm" | "md" | "lg";
}

const cardPadding = { sm: "p-4", md: "p-6", lg: "p-8" };

export function Card({ children, className, padding = "md" }: CardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-2xl shadow-sm border border-gray-200/60 overflow-hidden",
        cardPadding[padding],
        className
      )}
    >
      {children}
    </div>
  );
}

// ─── Badge ────────────────────────────────────────────────────────────────────

type BadgeVariant = "default" | "success" | "warning" | "danger" | "info";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const badgeStyles: Record<BadgeVariant, string> = {
  default: "bg-gray-100 text-gray-700",
  success: "bg-green-50 text-green-700",
  warning: "bg-amber-50 text-amber-700",
  danger: "bg-red-50 text-red-700",
  info: "bg-blue-50 text-blue-700",
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wide",
        badgeStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────

interface SectionHeaderProps {
  title: string;
  icon?: LucideIcon;
  action?: React.ReactNode;
  subtitle?: string;
}

export function SectionHeader({ title, icon: Icon, action, subtitle }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="space-y-0.5">
        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          {Icon && <Icon className="w-5 h-5 text-primary" />}
          {title}
        </h2>
        {subtitle && (
          <p className="text-xs text-gray-500">{subtitle}</p>
        )}
      </div>
      {action}
    </div>
  );
}

// ─── Stat Card (Admin) ────────────────────────────────────────────────────────

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
}

export function StatCard({ label, value, icon: Icon, trend, trendUp }: StatCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="bg-gray-50 border border-gray-100 p-2.5 rounded-xl shadow-sm">
          <Icon className="w-5 h-5 text-gray-700" />
        </div>
        {trend && (
          <span
            className={cn(
              "text-xs font-semibold px-2 py-0.5 rounded-full",
              trendUp ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
            )}
          >
            {trend}
          </span>
        )}
      </div>
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{label}</p>
      <p className="text-3xl font-bold text-gray-900 tracking-tight">
        {typeof value === "number" ? value.toLocaleString() : value}
      </p>
    </Card>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="bg-gray-50 p-4 rounded-2xl mb-4">
        <Icon className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-500 max-w-sm mb-6">{description}</p>
      {action}
    </div>
  );
}
