import { createContext, useContext } from "react";
import styled from "styled-components";

const StyledTable = styled.div`
	border: 1px solid var(--color-emerald-700);

	font-size: 1.6rem;
	background-color: var(--color-grey-100);
	border-radius: 7px;
	overflow: hidden;
`;
const StyledBody = styled.section`
	margin: 0.5rem 0.5rem;
`;

const RowItem = styled.div`
	display: grid;
	grid-template-columns: ${props => props.columns};
	column-gap: 2.6rem;
	align-items: center;
	/* justify-items: center; */
	transition: none;
`;
const StyledRow = styled(RowItem)`
	padding: 1.2rem 2rem;

	&:not(:last-child) {
		border-bottom: 1px solid var(--color-emerald-700);
	}
`;
const StyledHeader = styled(RowItem)`
	padding: 1.6rem 2.2rem;
	background-color: var(--color-emerald-600);
	border-bottom: 1px solid var(--color-emerald-700);
	letter-spacing: 1px;
	font-weight: 600;
	color: var(--color-grey-0);
`;

// const Footer = styled.footer`
// 	background-color: var(--color-grey-50);
// 	display: flex;
// 	justify-content: center;
// 	padding: 1.2rem;

// 	/* This will hide the footer when it contains no child elements. Possible thanks to the parent selector :has 🎉 */
// 	&:not(:has(*)) {
// 		display: none;
// 	}
// `;

const Empty = styled.p`
	font-size: 1.6rem;
	font-weight: 500;
	text-align: center;
	margin: 2.6rem;
`;
const TableContext = createContext();

function Table({ columns, children }) {
	return (
		<TableContext.Provider value={{ columns }}>
			<StyledTable role="table">{children}</StyledTable>
		</TableContext.Provider>
	);
}

function Body({ data, render }) {
	if (!data.length) return <Empty>No data</Empty>;
	return <StyledBody>{data.map(render)}</StyledBody>;
}

function Header({ children }) {
	const { columns } = useContext(TableContext);
	return (
		<StyledHeader role="row" columns={columns} as="header">
			{children}
		</StyledHeader>
	);
}

function Row({ children }) {
	const { columns } = useContext(TableContext);
	return (
		<StyledRow role="row" columns={columns}>
			{children}
		</StyledRow>
	);
}

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
// Table.Footer = Footer;

export default Table;
