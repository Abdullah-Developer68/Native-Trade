"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	Building2,
	LayoutDashboard,
	MessageSquare,
	Moon,
	Package,
	Sun,
} from "lucide-react";

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarHeader,
	SidebarInset,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
	SidebarRail,
	SidebarSeparator,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

type AppSidebarProps = {
	children: React.ReactNode;
};

const navigationItems = [
	{ title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
	{ title: "Chat", href: "/chat", icon: MessageSquare },
	{ title: "Businesses", href: "/businesses", icon: Building2 },
	{ title: "Orders", href: "/orders", icon: Package },
];

const isValidTheme = (value: string | null): value is "light" | "dark" => {
	return value === "light" || value === "dark";
};

const getActiveRouteTitle = (pathname: string) => {
	const activeItem = navigationItems.find((item) => {
		return pathname === item.href || pathname.startsWith(`${item.href}/`);
	});

	return activeItem?.title ?? "Overview";
};

const getInitialTheme = (): "light" | "dark" => {
	if (typeof window === "undefined") {
		return "light";
	}

	const storedTheme = localStorage.getItem("theme");
	const systemPrefersDark = window.matchMedia(
		"(prefers-color-scheme: dark)"
	).matches;

	if (isValidTheme(storedTheme)) {
		return storedTheme;
	}

	return systemPrefersDark ? "dark" : "light";
};

const AppSidebar = ({ children }: AppSidebarProps) => {
	const pathname = usePathname();
	const [theme, setTheme] = useState<"light" | "dark">(getInitialTheme);

	useEffect(() => {
        //document.documentElement is the a reference to the root <html> element in the DOM.
		document.documentElement.classList.toggle("dark", theme === "dark");
		localStorage.setItem("theme", theme);
	}, [theme]);

	const handleThemeToggle = () => {
		setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
	};

	return (
		<SidebarProvider>
			<Sidebar collapsible="icon" variant="inset">
				<SidebarHeader>
					<h2 className="px-2 text-sm font-semibold">Native Trade</h2>
				</SidebarHeader>

				<SidebarSeparator />

				<SidebarContent>
					<SidebarGroup>
						<SidebarMenu>
							{navigationItems.map((item) => {
								const isActive =
									pathname === item.href || pathname.startsWith(`${item.href}/`);

								return (
									<SidebarMenuItem key={item.href}>
										<SidebarMenuButton
											asChild
											isActive={isActive}
											tooltip={item.title}
										>
											<Link href={item.href}>
												<item.icon />
												<span>{item.title}</span>
											</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
								);
							})}
						</SidebarMenu>
					</SidebarGroup>
				</SidebarContent>

				<SidebarFooter>
					<Button
						type="button"
						variant="ghost"
						className="w-full justify-start"
						onClick={handleThemeToggle}
						aria-label="Toggle theme"
					>
						{theme === "dark" ? <Sun /> : <Moon />}
						<span>{theme === "dark" ? "Light mode" : "Dark mode"}</span>
					</Button>
				</SidebarFooter>

				<SidebarRail />
			</Sidebar>

			<SidebarInset>
				<header className="bg-background/95 supports-backdrop-filter:bg-background/70 sticky top-0 z-10 flex h-14 items-center gap-2 border-b px-4 backdrop-blur">
					<SidebarTrigger />
					<SidebarSeparator className="h-4" orientation="vertical" />
					<h1 className="text-sm font-medium">{getActiveRouteTitle(pathname)}</h1>
				</header>
				<div className="flex flex-1 flex-col p-4">{children}</div>
			</SidebarInset>
		</SidebarProvider>
	);
}

export default AppSidebar;
