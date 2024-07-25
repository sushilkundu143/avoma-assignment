"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("@testing-library/react");
const CardComponent_1 = __importDefault(require("../components/CardComponent"));
describe('CardComponent', () => {
    test('renders card with title and body', () => {
        (0, react_2.render)(react_1.default.createElement(CardComponent_1.default, { title: "Card Title", body: "Card Body", id: 1, clickable: true }));
        const cardElement = react_2.screen.getByTestId('cardComponent');
        expect(cardElement).toBeInTheDocument();
        expect(react_2.screen.getByText('Card Title')).toBeInTheDocument();
        expect(react_2.screen.getByText('Card Body')).toBeInTheDocument();
    });
    test('renders non-clickable card', () => {
        (0, react_2.render)(react_1.default.createElement(CardComponent_1.default, { title: "Non-clickable Card Title", body: "Non-clickable Card Body", id: 1, clickable: false }));
        expect(react_2.screen.getByText('Non-clickable Card Title')).toBeInTheDocument();
        expect(react_2.screen.getByText('Non-clickable Card Body')).toBeInTheDocument();
    });
});
