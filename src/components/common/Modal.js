import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Modal = forwardRef((props, ref) => {
	const [Open, setOpen] = useState(false);

	useImperativeHandle(ref, () => {
		return { openPop: () => setOpen(true) };
	});

	useEffect(() => {
		Open ? (document.body.style.overflow = 'hidden') : (document.body.style.overflow = 'auto');
	}, [Open]);

	return (
		<>
			<AnimatePresence>
				{Open && (
					<motion.aside
						className='modal'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1, transition: { duration: 0.5 } }}
						exit={{ opacity: 0, scale: 0, transition: { duration: 0.3 } }}
					>
						<motion.div
							initial={{ opacity: 0, scaleY: 0 }}
							animate={{
								opacity: 1,
								scaleY: 1,
								originY: 0,
								transition: { ease: 'easeInOut', delay: 1, duration: 0.5 },
							}}
							className='con'
						>
							{props.children}
						</motion.div>
						<button type='button' className='close' onClick={() => setOpen(false)}>
							close
						</button>
					</motion.aside>
				)}
			</AnimatePresence>
		</>
	);
});

export default Modal;
