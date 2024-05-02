import { useState, useRef, useEffect } from "react";

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
