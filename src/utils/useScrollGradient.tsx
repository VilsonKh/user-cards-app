import { useState, useRef, useEffect } from "react";

/**
 * Custom hook that tracks the scroll position of a scrollable element and indicates whether the user is at the top or bottom.
 *
 * @returns An object containing the ref to the scrollable element, a boolean indicating if the user is at the top, and a boolean indicating if the user is at the bottom.
 */
const useScrollGradient = (): {
	listRef: React.RefObject<HTMLDivElement>;
	atTop: boolean;
	atBottom: boolean;
} => {
	const [atTop, setAtTop] = useState<boolean>(true);
	const [atBottom, setAtBottom] = useState<boolean>(false);
	const listRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const handleScroll = (): void => {
			const element = listRef.current;

			if (element) {
				const newAtTop = element.scrollTop <= 0;
				const newAtBottom = element.scrollHeight - element.scrollTop <= element.clientHeight + 32;
				setAtTop(newAtTop);
				setAtBottom(newAtBottom);
			}
		};

		const element = listRef.current;
		if (element) {
			element.addEventListener("scroll", handleScroll);
			handleScroll();
		}

		return () => {
			if (element) {
				element.removeEventListener("scroll", handleScroll);
			}
		};
	}, []);

	return { listRef, atTop, atBottom };
};

export default useScrollGradient;
