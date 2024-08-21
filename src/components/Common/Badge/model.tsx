export interface BadgeProps {
    variant?: 'primary' | 'secondary' | 'danger' | 'dark' | 'none';
    className?: string;
    borderless?: boolean;
    round?: number;
    children: React.ReactNode;
};
