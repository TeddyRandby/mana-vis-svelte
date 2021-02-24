export const thisClass = (ele: HTMLElement, arg: string) => {
	ele.classList.add(arg)

	return {
		update () { ele.classList.add(arg) }
	}
}
