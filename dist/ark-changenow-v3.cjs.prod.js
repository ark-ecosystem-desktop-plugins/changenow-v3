'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const WalletContext = /*#__PURE__*/React__default['default'].createContext();
const WalletProvider = ({
  api,
  children
}) => {
  return /*#__PURE__*/React__default['default'].createElement(WalletContext.Provider, {
    value: api
  }, children);
};
const useWalletContext = () => React__default['default'].useContext(WalletContext);

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

const SearchIcon = props => {
  return /*#__PURE__*/React__default['default'].createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, props), /*#__PURE__*/React__default['default'].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
  }));
};

const {
  Components
} = globalThis.ark;
const {
  Box
} = Components;
const Listbox = ({
  isOpen,
  options,
  search,
  onSearch,
  onSelect
}) => {
  if (!isOpen) {
    return null;
  }

  const inputRef = React.useRef();
  React.useEffect(() => {
    inputRef.current.focus();
  }, []);
  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: "absolute right-1 top-16 shadow-lg z-50 bg-white rounded text-black w-64"
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: "group sticky top-0 px-4 shadow"
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: "flex"
  }, /*#__PURE__*/React__default['default'].createElement("label", {
    htmlFor: "search-input",
    className: "flex-none pr-3 flex items-center"
  }, /*#__PURE__*/React__default['default'].createElement(SearchIcon, {
    className: "text-theme-secondary-400 group-focus-within:text-theme-secondary-500 transition-colors duration-150 w-5 h-5"
  })), /*#__PURE__*/React__default['default'].createElement("input", {
    ref: inputRef,
    type: "text",
    id: "search-input",
    className: "flex-auto pl-0 py-4 text-base leading-6 text-theme-secondary-text placeholder-theme-secondary-500 focus:outline-none focus:placeholder-theme-secondary-400 focus:ring-0 border-0",
    value: search,
    onChange: evt => onSearch?.(evt.target.value)
  }))), /*#__PURE__*/React__default['default'].createElement(Box, {
    as: "ul",
    className: "flex flex-col overflow-y-auto py-1",
    styled: {
      maxHeight: "200px"
    }
  }, options.map(option => /*#__PURE__*/React__default['default'].createElement("li", null, /*#__PURE__*/React__default['default'].createElement(Box, {
    as: "button",
    type: "button",
    className: "w-full flex space-x-2 px-4 py-1 text-xs transition duration-100 hover:bg-theme-secondary-200",
    onClick: () => onSelect?.(option)
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: "w-6 flex items-center justifiy-center"
  }, /*#__PURE__*/React__default['default'].createElement("img", {
    src: option.image,
    className: "w-4"
  })), /*#__PURE__*/React__default['default'].createElement("div", {
    className: "w-14 text-theme-text uppercase font-medium text-left"
  }, option.ticker), /*#__PURE__*/React__default['default'].createElement("div", {
    className: "flex-1 truncate text-theme-secondary-text"
  }, option.name)))))));
};

const API_KEY = "86d883a331928e534472c534a653fd0221d60c390d1d857807b9b4484d8cc098";

const API_BASE_URL = 'https://changenow.io/api/v1';
const useExchange = () => {
  const context = useWalletContext();
  const client = context.http().create();

  const getAllCurrencies = async () => {
    const response = await client.get(`${API_BASE_URL}/currencies?active=true`);
    return response.json();
  };

  const exchangeAmount = async (ticker, amount) => {
    try {
      const response = await client.get(`${API_BASE_URL}/exchange-amount/${amount}/${ticker}?api_key=${API_KEY}`);
      return response.json();
    } catch {
      return {
        estimatedAmount: 0
      };
    }
  };

  return {
    getAllCurrencies,
    exchangeAmount
  };
};

const ChevronDownIcon = () => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/React__default['default'].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M19 9l-7 7-7-7"
  }));
};

const SwitchIcon = () => {
  return /*#__PURE__*/React__default['default'].createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/React__default['default'].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
  }));
};

const {
  Components: Components$1
} = globalThis.ark;
const {
  Box: Box$1
} = Components$1;
const FormStep = ({
  state,
  dispatch
}) => {
  const {
    amount,
    from,
    to,
    currencies,
    estimatedAmount
  } = state;
  const {
    exchangeAmount
  } = useExchange();
  const [isLoading, setIsLoading] = React__default['default'].useState(false);
  const [isFromFilterOpen, setIsFromFilterOpen] = React__default['default'].useState(false);
  const [fromFilterQuery, setFromFilterQuery] = React__default['default'].useState("");
  const [isToFilterOpen, setIsToFilterOpen] = React__default['default'].useState(false);
  const [toFilterQuery, setToFilterQuery] = React__default['default'].useState("");
  const unitPrice = React__default['default'].useMemo(() => Number(estimatedAmount / amount).toFixed(7), [estimatedAmount, amount]);
  const fromOptions = React__default['default'].useMemo(() => {
    const filter = fromFilterQuery.toLowerCase().trim();
    return currencies.filter(currency => {
      const name = currency.name.toLowerCase();
      const ticker = currency.ticker.toLowerCase();
      const isNotTo = to && currency.ticker !== to.ticker;
      return (ticker.includes(filter) || name.includes(filter)) && !currency.isFiat && isNotTo;
    });
  }, [currencies, to, fromFilterQuery]);
  const toOptions = React__default['default'].useMemo(() => {
    const filter = toFilterQuery.toLowerCase().trim();
    return currencies.filter(currency => {
      const name = currency.name.toLowerCase();
      const ticker = currency.ticker.toLowerCase();
      const isNotFrom = from && currency.ticker !== from.ticker;
      return (ticker.includes(filter) || name.includes(filter)) && !currency.isFiat && isNotFrom;
    });
  }, [currencies, from, toFilterQuery]);
  const fetchEstimatedAmount = React__default['default'].useCallback(async () => {
    setIsLoading(true);
    const ticker = `${from.ticker}_${to.ticker}`;
    const {
      estimatedAmount
    } = await exchangeAmount(ticker, amount);
    dispatch({
      type: "estimatedAmount",
      estimatedAmount
    });
    setIsLoading(false);
  }, [amount, from, to]);

  const toggleCurrencies = () => dispatch({
    type: "toggleCurrencies"
  });

  React__default['default'].useEffect(() => {
    fetchEstimatedAmount();
  }, [fetchEstimatedAmount]);
  return /*#__PURE__*/React__default['default'].createElement("form", null, /*#__PURE__*/React__default['default'].createElement(Box$1, {
    className: "relative rounded flex items-stretch",
    styled: {
      backgroundColor: "#3D3D70",
      color: "white"
    }
  }, /*#__PURE__*/React__default['default'].createElement("label", {
    className: "text-theme-secondary-text absolute top-1 left-5 text-sm"
  }, "You send"), /*#__PURE__*/React__default['default'].createElement(Box$1, {
    as: "input",
    type: "text",
    className: "pt-4 pl-5 pb-0 bg-transparent border-0 focus:outline-none text-xl w-full font-medium focus:ring-0",
    styled: {
      height: "70px",
      color: "white"
    },
    value: amount,
    onChange: evt => dispatch({
      type: "amount",
      amount: evt.target.value
    })
  }), /*#__PURE__*/React__default['default'].createElement("button", {
    type: "button",
    className: "w-3/5 border-l border-theme-secondary-700 px-4 flex items-center justify-between",
    onClick: () => setIsFromFilterOpen(prev => !prev)
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: "flex items-center space-x-2"
  }, /*#__PURE__*/React__default['default'].createElement("img", {
    src: from?.image,
    className: "w-6"
  }), /*#__PURE__*/React__default['default'].createElement("span", {
    className: "uppercase text-xl font-medium"
  }, from?.ticker)), /*#__PURE__*/React__default['default'].createElement("span", {
    className: "w-4 h-4 transform translate-y-0.5"
  }, /*#__PURE__*/React__default['default'].createElement(ChevronDownIcon, null))), /*#__PURE__*/React__default['default'].createElement(Listbox, {
    isOpen: isFromFilterOpen,
    options: fromOptions,
    search: fromFilterQuery,
    onSearch: setFromFilterQuery,
    onSelect: selected => {
      dispatch({
        type: "from",
        from: selected
      });
      setIsFromFilterOpen(false);
    }
  })), /*#__PURE__*/React__default['default'].createElement(Box$1, {
    className: "flex items-center justify-between pr-2 pl-10 py-3 relative"
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: "flex items-center space-x-2"
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: "text-xs flex space-x-1 uppercase"
  }, /*#__PURE__*/React__default['default'].createElement("span", null, "1 ", from?.ticker), /*#__PURE__*/React__default['default'].createElement("span", null, "\u2248"), /*#__PURE__*/React__default['default'].createElement("span", null, unitPrice, " ", to?.ticker)), /*#__PURE__*/React__default['default'].createElement(Box$1, {
    as: "button",
    type: "button",
    className: "text-xs",
    styled: {
      color: "#3bee81"
    }
  }, "Expected rate")), /*#__PURE__*/React__default['default'].createElement(Box$1, {
    as: "button",
    type: "button",
    onClick: toggleCurrencies,
    className: "w-5 h-5",
    styled: {
      color: "#3bee81"
    }
  }, /*#__PURE__*/React__default['default'].createElement(SwitchIcon, null))), /*#__PURE__*/React__default['default'].createElement(Box$1, {
    className: "relative rounded flex items-stretch",
    styled: {
      backgroundColor: "#3D3D70",
      color: "white"
    }
  }, /*#__PURE__*/React__default['default'].createElement("label", {
    className: "text-theme-secondary-text absolute top-1 left-5 text-sm"
  }, "You get"), /*#__PURE__*/React__default['default'].createElement(Box$1, {
    as: "input",
    type: "text",
    className: "cursor-default pt-4 pl-5 pb-0 bg-transparent border-0 focus:outline-none text-xl w-full font-medium focus:ring-0",
    styled: {
      height: "70px",
      color: "white"
    },
    readOnly: true,
    value: estimatedAmount
  }), /*#__PURE__*/React__default['default'].createElement("button", {
    type: "button",
    className: "w-3/5 border-l border-theme-secondary-700 px-4 flex items-center justify-between",
    onClick: () => setIsToFilterOpen(prev => !prev)
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: "flex items-center space-x-2"
  }, /*#__PURE__*/React__default['default'].createElement("img", {
    src: to?.image,
    className: "w-6"
  }), /*#__PURE__*/React__default['default'].createElement("span", {
    className: "uppercase text-xl font-medium"
  }, to?.ticker)), /*#__PURE__*/React__default['default'].createElement("span", {
    className: "w-4 h-4 transform translate-y-0.5"
  }, /*#__PURE__*/React__default['default'].createElement(ChevronDownIcon, null))), /*#__PURE__*/React__default['default'].createElement(Listbox, {
    isOpen: isToFilterOpen,
    options: toOptions,
    search: toFilterQuery,
    onSearch: setToFilterQuery,
    onSelect: selected => {
      dispatch({
        type: "to",
        to: selected
      });
      setIsToFilterOpen(false);
    }
  })), /*#__PURE__*/React__default['default'].createElement(Box$1, {
    as: "button",
    type: "button",
    className: "w-full rounded p-3 text-lg mt-8 font-semibold",
    styled: {
      background: "#3bee81",
      color: "white"
    }
  }, "Exchange"));
};

const RecipientStep = () => {
  return /*#__PURE__*/React__default['default'].createElement("div", null, "TODO");
};

const {
  Components: Components$2
} = globalThis.ark;
const ImageWorld = () => {
  return /*#__PURE__*/React__default['default'].createElement(Components$2.Box, {
    as: "img",
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAvkAAAGPCAMAAADx8T8LAAAAXVBMVEUAAAAAAAD///+AgICAgP////+qqqqqqv+q//////+/v7+/v//////MzMyqqqqqqtWq1dXV1dW2tra2ttu229vb29u/v7+/v9+/39/f39/GxsbGxuPG4+Pj4+PMzMx4LRxlAAAAH3RSTlMAAQECAgIDAwMDBAQEBQYGBgYHBwcHCAgICAkJCQkKF8EaNgAAAAFiS0dEAmYLfGQAADe8SURBVHja7Z3RdqM6DEUPJtBCQ1pIIYV0/P+fOQ+yjUxMgDRJSaPzMHddz2Bk2aVGaFuAaChFf9J/4tMmkehPqtSdAjKtMwBfugaw050CUq1zcY/oz0prnQO11jWQaq0VoLUugErrRtwj+rNqtU6AQusCUFp3ABqtU6DQ+kPcI/q72/xtAgB5DgDJVgFQedo3iUQikUgkEt1YL4UCEBe0AykAIC1iAMo2RaxpbIeS817oX2WFAqCKFwDYbqnjDQBVZP29kiI527FIdBsl9NbZaR0DhdYlb0qArdaVezf9HItEZhSooUtKrQsg5U3hN9wSUBTuqSnqKRLdTbnWmhZgZiONmQs+5kCp9cHFIzutd8FeCq0710ujdQVstdaYjGomWusE6LQuZC5E95RqdQGg1A2A5KhTAAddAih0GwFJpzMAjS4B5LqLw710OgdQ6gOAVB8TQHW6oF7os1UKoNEVgEJ3yt2r1jV1LF90Rfde++xPRLOaJnqJMHbJBR2LRCKRSCQSzVdUdzmAoisBpF2jANimCkDcdgmAqisA5N0nAHXoUgBlV7hLVOM1Hagpc70kXRu7e+VdDWDTtht3Sd7VkbtX2X0AyGzH2dC8v62nGOQalGt9pBBMChy03vHYTgqUWtcU24lYbKdxUZlW6wIotG4pKqOARuvSxnYiiu3UWpf2XqaXSuvKXXK0HdfUFNvYTh8hSuy9/rhaiWndbeX3S6vWugBeKcaubSS+omUO4GjD7jVf5rRAGyB2kfgCyLVuqZcUqOzKN18FXoFS6xLYuNhobu+l3I9Uzs2L7b3+uBpZ+XdSUScAsjoHEFdlBKCoUwBpXQBQZaUGTRE1besMQLwvAaDcxwDyOgegqJf3z6TvpSqVu5ftuFQA8joDkPB7US/J5zsA7OrENZl7/W09xSBFIpFIJLphJIeHDRT/j/nz9FOSUidNOL3wgl7mNV31g9aoeeuQ9+lPAjzXVMLTywrdxS6joNYHALn+piSDEkCl2whItc5cU8kzClq9B/CmjwmwOeo3AI3JO9AJEHcmB8JAt6m7V2mhW0qLqGGzF+heaHQzNO86OhjzvnvzaJBriepUALa6i4HkKEjyNVVy0NWFDfsQZmtDMGcz1kh9xto7sNO6c/HIA4tqKrqEMtaK5RlrBQVCr6I+DlsOEupWIS8F8IPCYKIrKde6Dxzstc545rACSq1zIKF4pMtS/gBimggiaM2vZmqqbPDRJC5HtpcXrWvXywfPUp7gcNU/faTY6AuQUi/X2UzQvci8TOu9G/c69jqnDhVdTRn7FRrlLwCQ5go9G5sBjo0N4LLbhG2dtqq/hDqOt3HflObRsBf/XmMcLvUSURNdcqXNHrf4hZu3jr2oMe91OFMikUgkEonGdvUsKmKoViJoCXS1G6BCAdgUaf+vAhyu7WWMwyXoljqOeNMvc7ieefZeq95IqFPvRYIkL1LBX2cbrbMB6OoiCv0bbmXfcIccbh8OCnO4udY1oLT+pvfk7Vo43HrwAu5eIVcrZ/F+MC2iuap4WOSodWGjmiZs6H4+ZkQ1jVyuZnuvqOZP1dlxt4Oo5mrFo5retIjmKuUPTQO60sOjYYt53pcso5L3cpcvWT//xdfFQPKtc/hfslYr70tWrVsAuf6XyHpesmM8TVWIJpIQxvMORnu5dfbCT50QsDha97Q9nMUikUgkEt3nV2RV9eiH4TyoiZTU78NL4roMNPVkyktz8oZpmZJaASiarO+lrGMAeZMDUHWpAJSEoTQFALU/JVPIvLzhZMpeuV6S+npvdZE1j0WLqGnlypotOVS2O2cCOR7u59i+PmIwDIx9nQZPiITLtD4SQZsO/l5r/TKXRnxzTGMK7Ll5R60zSyMmAxrx0/XSXjGUV7igkWJN7fqfZxTmEkDxjNzS+obPc/cr/21wSTu28j0CfbjyM+CDE+hfQQL9w0Y1zcqv+coPEOgdszjmBLqsfFr5O1niI4qbRgGo2gxA1lYAVNP0v8/Tdj/8hZm29TB8khxqBaBscwB5e7LdoCZVHxIAZfsGIGlrBai6TQAUbeF6iT7b1F3imeeaYgDvbTG0mHpJ28+r/Yo3FtO9bFObrn9at23ZT4tIJBKJRM8b1qE/Z30XmvqSNTNU8kBfsu46B/iZ+aMzNfWBcUn3f+e83kF6QAlWXZZyAfr0gKnshXl6pOyF+yhADi9xqAs5nHC4PHvBkcOdAvLT8MP0a36nmHmPX3/V5X992qhMHzzpz+qbl7E292ftcTLW7qIhOawpQLVwaQY4XC9jLVCKY5H4cY0xXwKPKsr53WldOIL2wKlWrTs1SAM+jmUpz1Nuk4k9bHTv7uVA157DLedyuNTx8bGqBalv/c9ZTIOMlgO+w7TvCj4eHXDoIpF5hEd7S+Bht/kFB10N+sGpVq+2G2uyS99csuARYAjaQgEAMSVZwTq2tkQzzEvGLI6K9GHmwFqcXehQ86vDc+iWTe6bAYZOHLpsoaS9ed4SEIlEIpFo9bud9LRp8Q55nMNd9vt6bRzurcX544smj+HRAbDZ43ADDr3oXsxiPi0P+oY7CI8tDnmNcrgL39HWxuHeWJnljy98X+R4tDnNa5TD/ekbLt2LpkX9s6/ONC2HR1z5+jSnUS9OcxzncJdG954rqlm4aG5y6WOrCBYYvk9Us9a6At5oWh5O5Wnd2N3yUrKjHO7Cx8qTfckyg2wu/S5kMGH7afDeX7LctDxmKqia1TSvl58esP182Qs/tHUUbL5P9oKS0sMikUgkWvnrVT1Sgs2TqbdW7zAowWZKkU1UiLvkN/hVKsStXGQxPj5HXm3JoWaQ5NDX05J73rQUXsm9KgaQ1W+9Q8uQQ9NzDg2Jl9x7UPVUa2qp1uy03oBHtRY8CNdovZ2uCnqBrlMVdOXqbPCxHQ2WxYNpGZRZ/Qd/WhKqOczBZm9aPIfutf6gS8iWNAg2h1dN68x77JVPUa691hWQkz+9Z5PzxNbmahrQtbX+7Aaoc748fXMQ4emDcAZav4DDfYiVX4yVNjEOrey0hEprg0U1A6W1v9wljdbvvLS2A5tTXsom4NCAtny+H1XVGOjq74kM1bqPAFU3CWuq+0uK9h3THO7MjcBVONyVKyWLR2neot31g+QOVbzJmxbbRGDzVwKfwzX3ol4Scijv2N2rd2hA0b5NH8XHIpFIJHpsXecDwsXfhcabltTDHbfrKl+y7joT0aWTp64xLZd/yZpXTXi86SqfDj3zzv/LQHXZC+4XTA84y+G6V9CT9IAL6uGee/W+QvbCnd6VdBtZi2e/wPcWx6flej0O95VPS8ChP8xeiOgScijdC1+n5nGLx7MX6kuP3sr1MQm6Irg0dGSTuS5WQYGcJRxuH+4ZpIRdUA93XNfJWLvPE9/lf81+m0/Jof9Y/tdwWnoOlwYZcGjuQjA/yVjzpmXo0C1PqNtMZqxdHsvreCxvIvjh4to/meGXYBpwC5ul7HJ+v5VNUe2nW9l02N76c9WCFll8nSzluwUnF+b8Kq2PFHZ/cZnDg5+MnsP18OiAQ3+YpRzzadlxhxKK7Yo4/VPTWcoXlwauWMGoyecGh08vVsZ78dGP85xHoGmqQlzKad4JXYdMuY8uKMFmvZf1gwxMixnE9g0AXkMOVfg5meJNC93LNjHzvPkeJVPiS5ej17FIJBKJREgTAFCvAIBXBQBJSk0RALx4TSe/PkwT9RLTb6cX9q8UNaXxSS+jTXF6at4LAEQT5k0NkjqORi1OkvPm3eB99tQWz7zJfU460TFzqGlKxh06OlOb06Yxi/ 1pOXXoJj1vHu84YPHAvOgHM1VQSIve9BqtKT5VAOqoW3q9iYEXetPrTl6WI2oq7Ito5Xoxu1Z6y6BeTMedPRAqsU3odBcBpdYpkGj96fp/1zpzvRz0d28etzibeB+kQSYUL6FLnMWf3Lw3QHW6BfDJzIu6GUGCC8PALb2AvwApmfelj868GSG5Yuw92XMovZt2CthqnTuH0r08h9K0ZHwJUC/GvFZ3yjo0tQ795yxW//SBfBzbe5lB1lon9pKIL4HEHmHVuV42ZF5rw6X06twMVo25F5mX0Yn+3fy4/MGFDV1UszwNG5Zady58NggKmcSychAj7MOl1PQG7F2UK3y6ID8Mz2g0qpkPzDsb+f1aGNWM7xTVTF2mXiBGOCOq+TkWvRg/XXBJVPOFRzXLn0c1iwEm7Mw7UopsYnvZ8qgmt9iblmxgcbvsCMXCfjqgR3PnnqCq0w2Avf5HX3So6ev04dK6h+qGpqvWR/7Mr+hHlR6qORC5B517uKDVHYAP+uDEJ92Y961rAI01b+vMo3ul08/81D3zaZBv9pcJNZlfJvSIMk+S2N7LDPImz/wDN+/DDbKYBdvno78Z6KFacoce7BOUHs17dy837tpdkvIlsLPP/IKbl7Jfor3F3rS4jhu3BBL7aO6XQOJ+mbgRxXbzwMw7WvPiwQrlFqPV3eyP30kMAIqeaYkCgDg5aVK8ydvuJNFIL2ZyvY431BQN7xXxJu8uXtOoeXGyeJChcY+5wph3g6WfjA0ymZUWHY/9q5BDJwY5bwlY89SFDrUL6cS8iP5nE19ocWDtiUQikeiZZUHXUXzSQJivrslAmERUGja23FNTjjDVen0O1+wQSlZVl+4VUdO2HtkbX8zh3kzRqENfuXm7kENHMGGPwx116G9zuHzV0L08DtebloDFyanFm8+yXwK5XTX9vZgyB5E5ojLV+gjgn01W6SHMzuZxBKrLHnjGze72HC7Jq6p7HFgc3uVdzOHe7uGjde3uRcjlluJ2A9C1d2jlqFY3LaVNr+kt7qlWBRy0fuMO/X0Ot+/FLQGPw+XTopx5hDn2hZXftd5T0Iiik95Cin2LBxEBzYnK0kGY2vqzGRCVBGH21WV3Nj61cbcqLVHZh7Qc8HkScVM+8BnzKFeu9XFQeNXrxauqG7A4IM7hRnSJ43CPCGKjx9uu/J3WB3evAwv4edNScLC5tgvUA13rAdjcZz5umEP7dbT/AYfbBs1TWuvXIIe75xYfGSac8ALDw1xNV0VZuWdUH9WkKspk8cvpQjKDbMfSVqsuA5B3JYCkJXyyy12TatqENRm6MwHw3hXoC852KYDCNDUKiPbdi+slPjSxu5f/vOsKAGn3Gbl72SbicLsMQGHMM039MlRNu+l/in2LtyOhnbbpLaZLNjRu64oKDhv96AoAWVfdcrdjHPpx6lA+LdEna4oPZqbenHmqOcTOey8dEbRsWgYOfe8HWXnz/RW7+aZLnEPf+iZTYJiZF7DYW0iWw2UODZgX8ab4qxkuAddLDuCVBslX6MC83dChIpFIJHpSeXjlaRMCp7hO4JOhXuZ1vOReo0PBxLmz0RKL7+L8Cxw608cTHV9nWm5m3uULaUbHDj4l8LFLANUaqvVLAUln4FPiMlvCJ6lsbQUg193GNdW67nuhjt91q4BU/+tBV0O1fusUQK33rsncqzaHfbPyrZVu3L1UO5ad8KFb6iV3Fuenh33n1rwtgFIfIuBVHxNmXttzuDcWmbcZODR2DvWmxc4UmfedsmnpFJD+Mw6twKjWt3MOpUEah9K9kqN+AdQX69hbAgHznEPfnEMzfUyAiK8a49CGmeetGo/D/dQ1gNRy1wGLd715R525e+XW4pyvmqBD+xf7F/uWPiNjrQ0mWA0z1pZyuKMZawEON6Shea4erqclHO6txROs+uBJOGONkrkiHiwbBk/qIId7nYy1dXC4gYy1ciJjrTsNPTVal5aN5fikR7V6EGZr00LpfMku8ilHE5mlXi7gcIflePJBPVyPww2vowTYOvNgy7d6WsLh3lo1qy47rOA7pFoDFvfTwgsMDzncgEMflsMttH7n5qVj5lVAdGTmhRx6SlT6dWE9CPOVmubjk4s4XLqX10SXBDjc0KY5ZPFJIH4Rh3vrbT63xTK/50FXFQJdAw4dA10fnMN923LzMm5xfHYhBSwWiUQi0fMENU/Bx0UcboCVDFCtpuNLOVzfvBdm/hJM2NM4h3sft49io1OYsD9T9D9qlveelMPlFHP0OmRjWwt8LuVw3xmEOc7hFhz4vIDDJQjT43BtWHCEw1UT6NQ4h3ufhf/NsNFXrd+nOdyAQ71pCTjU9PKQHG50LQ635PHptkcE+5DW60Uc7rmo5jBGeDGHOx7VHOVw04mj0MajmndRIAg3xeEWWn/zqOYeeOXj/jwlh68Z1Xx9VA63Y0Arr6KsOOV4AYfrQZijHK5HVF7A4R64ed/smT/K4ZqmqWd+gMO9zzP/FBsdcrhDqjU5dahHtQYc6qZltRzuO27O4Rb8md+w4xgm8ckJDtfHJ8c43BA+uYTDDQCfZrc2gY2Or73Rcd9n6c9y6Pi0bBaArk/O4Xo0rqC5IpFI9MS6J4cbxEbPc7j+y+kph8ubpjhco1EO99bbHG4xDdJwuGb7JhzuTTjcEd2Vw3XYaDWXw/UU4HBTHpWZ4nBdTGuEw72xevMo4Pdmm9w7mHC4N+BwRx9EF3O4h+UcbhgbPcfhDtfskMPNaFZcUzM3qhnicG8szzwaJHG4Rl/X4nCHmY9343CzO3K427kc7vhC6CoAaXdQAPbdG4AtsZJfXQKg6goAeVcDUE2XwhKVadcoQDXdK4CSIMyuJfAxd5ckXRsD4E1x2yXoucxGuXt9dKXrOKq7k+Qi3mR6IfPMT/GBmTf+s94YurNy5oXudYPdDrf41Xqv36ylvMma96WcxW/dvnconxbPobkhaLvMTcsrd6glaNm00L2cQ7f9tJBDK3++U9eLaxo61DPP3MuZF7GFtOvvRb3s7EKKBxbHbZvwhaQGSyAbM08kEolEIpHoSbXWff6UvE1e3n1eNm5j3l00vs/nbyayzz+7zzexjrF9/pLpWBjbaXls533wlj4MRUzFduIzsZ0ZkZI+trO8gq8X27mPRmM7XjRqBbGd6MexnZfR2M73stjOv0Fsx8jFdhqeULcQInWeKHi0lHhUOmXvn4vMUrTUi+fnPDJb8fguD+a+DuL55SCYW1ge1cTzZyxjZ97R3WuRONV6p9+u1uJv2EF6DnWh24a+qSRnHNrH818H8XwXHW8GDs14wNyLjv+zuGzP4bro+GfwC0REvfAlgCOz2JuW4eeGbGDe4fQLRKn1Oz/51VlsxFeNuVez+OGXlvSFrACAvEwAJGUOAAV9eitTAEm5HTaZS6gpKzMAqtxFAIoydr3YT2+mY/ZNLytTAHGolzmLMXo3tjCLl8ia9x7dbWO5G/MeNdkfkFINpyXgUDstxbAp5pd4DqWmlPeyLRPXFH0wh8an5nkWnzFvFzHz3obmbfz5fh1a/GIs/ojcqvEsNlvdsgAQ7U7HLRKJRCLRmU3PGIc7dcmNOdwz25VLOdxf0yg26getnprDnYzIcA73Sm9fYQ53XPfhcEd1MYf7azIWn3K4/vPkuTncqVg2N+8qGuVwxxXmcKsJDncL7F2sLAa+Z9XDDehiDvfXNHoY3vAZtJTDrW/I4X7xsOH7BIeb/5jDnfH06Dnc33rm77R+ve0zfz/jCfrv4Z75R/+Zvws/8w8Tz/zukmd+5Z7Wb3xaDqfPfI5H90dDTDzzv3vzvg2Hq2N7r/Fnfvmrz3yLT5rt+JLqsrRjS6ORXpJktCka3itK2eZVTez7NsmIxWqtJTLiZI6PfVdd6lD6+5BDJ3sZc6i3HR83b5bF3qqZN98B74hEIpFItESqfAeAvEoAJPsFX0SLSgHI9vTpjcrWVjGApGIf8ArquOLfcPcpgLgibLRkvVBTUW0ApBO25HvqOAfcR9J92veywu3+/uSDrZ2DoncojVuVH2AO5d9w9+nQoTl3KF0ycGjMOmbTQk2R7SXpe3k/daj5hmt62THzbMcRM28bttitmtf+ XvO0rZKll5yXx+F+L8iC8TIw9hwb7a7B4SoqLjD+TeE0rSjh1WVXGNQ/JYe9OXgLcrgtfLB5Bof7Ncjbmc3hfmMxh/sFBja/T3O421MOd548DvcqCuRqzg4K3ZLDNeGzUXm5moHUwvXJC7oKhxsvy7L0ONzrzMdpfv7MbdKNOVxKzj4T1mf5+R6Hu1oIszpNxrdz8Mwc7tzNCeNwRSKRSCQSiURntkweh3tBOPQu+3yzaR89b2d0n+9tpNe0zw9wuHLezjm3Bc7buTiuzF/sm0t51PvEdg722MKRM9ZGYzuFXlsST4DDNa6QM9bOPjBOz1i7VD3l6CKzl/383CGeX9tCu71zPvgxkKPx/GIi4fTX4vkBDve54/n5xDMqcK7mxeIf8Mw33It6ucM3XPd5s0/w8j45jn/DJfPWpMAXUdP03N9wi+osbWLJ4Wt/wxWJRCLR39YN8tjXVA+XLlkTmjuvfKvUwz27aF9+Pg9eddnraE31cDlCZO712xv8MQ5X6uEO6+GeW7TNNSbi2kVgr8/hXl4Pl4qhfvAKvr+sUQ43ddG98tk5XFMP97aLVp758sx/zme+7PNln/+c+3yRSCQSiX600c8BICsUAFWkp00ZAOQFACRFAkDR3+dFNGyiSzZF2je9FApATB1TL2kR9/eiXkL7jCL5HYek4xabcSsAabEZNtElEW/yHGp7CTg06y8JONS4YvsGAK8h89RwWgIWB8yLQ+al/b0GFqvTJaB+c6Z+HL2g9JoG/gH1KSVltDa9hs7P/6ackow1mfyVHEhdL3Qwf+7Odu+0ju0lCT/xfzt2WJG51y/s7AcFCSi9poMdZG7rBpg3PWqq3SDJe9mpQ00vzqEfgNL6SOk1L0DGE6G4QyNy6M4ec9+GHcqnZWjxfjAt2anFMR/3zr46m4P5UztIpfU/twRokOrfSg/Im45quiAceBBuXs2UDY9ybceiml4QLhtENQ9jC/B3opqexWejmuo0RpidKUIzTIbso5rH81FNdS6qWZ9GNYdVXt7PRTWzWVHN7XTNlIdTprsEUJ0uABS6VUCq/6WsqVNA8q1TALWu+qZOZwBqXQPIdafcJZVuqCkGVKsLAKVuACRHnQI46JLuFbleAqp19SsOcRYf4MxrdOkGGXc6B9Doqh8kNdEgPYfudBsBqf5OXC/kvfTfiUNNL6MOTbVOgw6NvnQJ4I1Pi7M4dhaXdlo2zOIDgBd95ObREtDpwGJn3t7dS3V6C2B/9VC7SCQSiUQikejKb3e34nAH2OgIh2s22j7oerh33OCTWTxVD1c4XNh6uI+tW3G4ofKtAQ7XfGDgFXybOxa/5bGdKFBgWDjcPxXb8XS8FofrgM/XIDaq3b08Dtet/GYAut5T5qBSPTAPfnXZDSeHt0EOt3ODrOZyuC0vOPu2gMP9h8UcbusGudf6Y5rDLcY4XLWKrNqfznpdAFAVAZ91AiChprJSAPI6B5DUu2FTvC/hLsmoqSLAt077jukS3hRR07Zmsc1yH7uOFfVyT41aTIOMyorMy/pBksWv3Hu7Ojl1aDbmUAKbP5NzDrUcbp329+LmedNC9zK9kMVZ/dY7tPwMmMfHTRwus9ibFrqXGSQ1iUQikUj0IEqo1BLVTUp404aaItZEdbJ4k3dJoMnUcJpo+mVNmafGmuy4T723CTg0Hull3KGhaUnmWzw+LckC89SpeVHy+Ick15b0IfinAlBZhCgHIgciOfgHre4AfGidALGtEWjgnxRQ37oG0OiOAKwtoDpThO9In8kL11QsKH9xu4V/9C3uzSstm0RNB2dxYgmnHnoyTdyhppdRhyaOyXJNnkNzi07t3b1cx/WpeQ2AnWWyCm5e2GJvWgIWJ1QHOGBxuwZ67lpRTY/DfQsmWC3hcEPYaJjD/fj9bxqnBYbHOdz2Ug7384Yc7oFzuLsJDje7OYf7ELoZh3vQ32ouh/vbz/zTAsPC4f6Ew30M3YrDHWCj5znc3176oxYLh3sRhysSiUQi0Zr0CxzuLysbo1rHOVzSKIc7rj/E4dpowCNzuJ7uz+H+slJHtaqgeQGq1b0Hj3C4o/pLHK55bDw0hxuOan6e43B/GNX0wmcrCGE6i/eDsGE4qul+ZEY43HM/ZSMc7r+rRzVTHtX8uDKH68p8/6FczfcxDje1HO4eYxxufMrhbjg2GgHJUWdARBzuh25//0lhLCZEldhY1eoPAKU+OEw44lSrCwD3HK4Hup6LGU9xuG/nHBrmcF8A9cU6nsHhJu5eNMhMHxM3yAGH25sXc0zY897nX+Bw1en/mKZoVpM63xS6ZBUjXjRuTAzy4nupWR3/cFqiWU0zB7mmmRSJRCKRaN4LX1cCiA8NcZkZgIx41OYQAygM3fkZAappE9ZUK3eJxUZNU+46Vk27AVB26yEZyOKtMe8Qh83jTapu+/c5GqSqu9QNMmkbBUSfrCk+NApA2b2FHfrS7SPXS9Ch7wDixkwLd+hXb3FqaN42cfcyTbWZqd68gMWmF2Mx3cty1yMnH0X16ioX/zi203O4/y7icBOgmeBw1/Gjzs3zyrcGojKkHT8V7nAtDnfLIyWbO3K4r3M53ICm6uE+kO7J4a5CGbfYlW89Dv5Vwi0ueC2MJ+Jww8+N9o+s/HtyuOuQtXh71jzeZDhc0jNxuAHRIEUikUgkeiiZLxOnn1QCTdHEhxcVjfWywhHPMs8bN0YHGc3xnpryHi7sJZpqmmVewDsBV/ydb1ilhU8pe6EEsKOP7dp8E6/hPpNrc5o2EbTsY3utDwBy/Z24XipzmvbZxJbfWPedfgew1y2mzaNBJt/sfY8GGdskgzYCcq0TlhbROxStrlxTwKGml1GHvvJp4Q41TcY8mha615aajibvoAWQ63/cYkPzpkDEzTP6YuYNXdEfcv6nopqzK0dckLG2JgUy1sbFOVyjcxzukXO4ZytHfP+gckQzUTnisow1L5pLGWsBV/yhqGZrU3MpHdbwqK5Jad1FQG2zVqls7T8F7C3d2WcplzZL2Uuq/VjXgBNucTFxkmGtdWbH7X5Jmpzf/WDcqUsD3nDvhR3aWMC3BtRRfyt7r/TUvETrL9604ynJ/bQMkqirgXnjWcotS7zsLU5PXZG6Qf6Jbf42AYCcSIU3BUC9pX1TvI0BqDwFgIw1RfkLAKS5Yr1kAJBs1bDjVcVx3+abF/Fx218aGQC85NFw3L4rcuaKUYemecQcmo70km7HOubmURPy175pYF400suWBSo9i72Fws0TiUQikegBdWMOd32ax+Eue3d+7Hq43tZmoh7u39GNOdwVah6Hu0QPXg/X00Q93D+kG3O4K3yxn8fhLvq1uSSquT4OdxjrHnK4fy6q6Z5Xz/Ily4h/yTIWl2yQ5iPPoh+mP/Ely/4Ue+b1Fv+hL1l22p4oewELBnlJlwscusLsBcwyTyQSiUSiR1XVZgCylrDRJgZQtAWAtCVstElYE2GjbQagaN8BJIdaASjbHEDelmse5Ftb9oPkFqumSVyTGSRX8mVA1xHWhnqJm6Z3RdChFVwvA4e+AijaHXo21jcvZuaxaeEWq/orAbBtSzct5l7US8LNG52p8UH+NeXEuB1tjGOIjfYcbmyBT49GbGxTH+5Z5SCPnGr9tFRrpLV+seNOT89YM2oY6BpSoODst3Xo/rTsZuccGuBwqx9wuF+cw32394pc0GjI4YajVe1zrPwbcLhrHWSIwx2thxtY+dvRaO2jcrjhld88x8q/AYe72kEGONzReriePA43oEflcEMaHaRIJBKJRI+ua37JWu/wFgxy8rvQH+JwA656Gl0ze2GF6/6Uwx3PXvA43IM57PtPc7jeK82fS1WY0DUz1lYZ1VxaOcKr4HsdDnflGWsuttM91cq/Zpby+nRBtSCiWserBVHO71/KUnYPifqpVr4hFQyqaeCFl74p5myFhToSANE275vUWouIcYst6MqZEjtuDulsI+cKM8iMDzJnRE6wl4BD076X2JSeyybMCzRlIxZnRTScloDFnnkBZYXkp4lEIpHoCXY7Mf/lzJume1ndbodvJ4K/9U+aIrN32PZN2LLthJrYlAR2O56PX8ymJO7vdWZrk0xso1Q/ SLLYXPKW9/eat9tZR+Xiu+vgv5B1yp48ZN5wj7NAvfW94e7tK+QB/rlNAXK4f1/M5r7hpvwN952fNOVO89o5W8ih5g33W/8bnDQVDU6aGr7hbgbm9SdNff7spCnPvKfTvKjm1CN/fVHN7rSky/2jmkYPweE+neZ9yZrS+r5kbfVx8/tfsszG6xE43Cfc6NOfP0RU13p8+G9nL4zbggW93IfDFYlEIpHob295JsiUR1IQ/ZhPppgKcVQ8bapCnPHeBJkypXWQKc+pKRrxkX6IKUDV2PSapTQiNW0chXm2Kqh9vz9PI86z+JdpxOdd+WcJ9Adb+Qlj5pcS6IWL5iqfQFec537jK3+KQJ9n8S8T6M+62+HF6tPuM3Jl5qnpkWQHQcd6dBmAt67sB1l2OYDcNLWJa6JLVN0mAD66AkBijvXoUndJ0jYKiD67/tEZH+hYjy4HkHXV0KHTFrNTRyrPvK+Ymxeds3jLzAtY7I1bJBKJRKKn3/sAOPcly/tk4jXNAz5vbPiST0W/wOGO232rL1miuRvliewFzuG66MbJx/by7t/EXS5Ag7VkLwQ43IBunL0gmquJjDUvNapvcglW2W8FESiLzOR/rSJjLcDhBnTrjDXRXAU4XE8c+Oyb4iDoek8RG6u+fdB1ZRxuQLfmcEWzdw2nFeI8eRXizGPrtN7aL/AOoyXY5lWI88qipQaXPV+C7YIKcQHdukKcSCQSiUSi4W6Hl5m3xepfgEGx+tB247TMvFes/i4ii5ET6PrGbAmYx5siPm5jMfXykkfskmzEFabjN04xb+PeofOUjpkXdPhrb7FnnpnJ05nyOhYNg2ymPmoJqE7/U8CeYaPmVSocXPngb3qbATZ6F0WDg7Aa/oY7fIV8C3K4vcWOau1fIUv76mxeITcswGVeRBN7L6V1Fy0DXROtv+CTw+PleqsxDtcLPHhqmXmi6ahm4HTB8EQMo5pejPA+j/z7RzXNw3oiqjnzLX00qhnQaFTT/SyeRDVdHLaWhR54dM85UTb0i3rsUxFavb/jr6x7f8lyj9OzX7JmbjVHv2QFNPolyz2KTm5M5r1KrnLY+7RtmMgFCF14zYKzPzT/ntkLmHWvC8xXUw4ftRhjF668crFIJBKJRPfXvApxq7f4RhyuB7qa4MxyDtd/yzrlcKc0yuGG3sVMx6VsdyY2nfOqgq7M4rtxuLwqaB9vWcjhegpwuNMRiTEONxwOSq15ojOKeVTTo1oPLGy4tpXPOdw+qlmxqGak7QJtBhzuTuuDI2i/WJZlD7q6QGdfCbpfoMPjGheu/ACHO2Plt2HzAnJB10oW93l9dCWAtGsUENVdDqBgTaCmNSlgHjXFbZcA+DRNFQBFTVVXAHjtGgWopksBlIbmZU10SdJ9URMBvnsASdf2H4zyru7vVS6nmGtmnull6mfdmldyi0fSk8m8pG0liVMkEolEIpFI5KvSDYBcdxtAtWMpKR+6/Z3A2d7kHbB8i1I3ANJ/OgVUqz8AlPoQAUmnMyBqdOku2XQma6NyTTE1US+Z7nj2QquAVH+nABqLy/5k3MahdK/kqF9mRCG4ebk1723sdZgs1qkbpGhB8GRQD3c8iPA70ajf53AvViBjbTIIMcbhjk9Lzc+WE81VoB5u+F/9Su2sdXC4FyvA4c74YRnhcEenZcfrG4nmyuNwX8bg0l+rO7YODvdiBTjcyaU/Zt74tBDzmxYS2xSJRCKR6IzSBADUCwBErwoAkhQA1GsEAC9ek+ovuad5Mb+9sWXU4jQesZh6iU6bwJvsJafjXq5oyYVJejLuyUuSH5n31HrXOgNiepU66G8qwkfvTQ2ARms6eK8AVKdbAOUdSSC6lzGvtTUCh+aZpm99cJe8av3OLX4BUnrR/NJHek+mN/vK9UJN6qhbek+OXcfdpa+QdK+ZP+P8PbiYdazalizuxvLaRGfEo5ohbDTA4XZ3zBDstP4A3px5L8Cni2pGs6KasbU4HNX85lHNPfDKx11zDveCANWScwFLHqJpZ/lYopo/UEEHoH7rGkDDH6qdbgDU+kjAZ9+0u+Mz/90+8/fcPHo09xZn3LxS6wRIbdOXG6R5qNIl9FBNqIkGmdsnaAPg0z7zf/RQbRZ8D0s54F7oOR+/nHkHWcjLlcQAoGgt0+Y2Tiaa7hhEo9t7tiTJYosDgww1JeebLjZ/nuLkZFpm7vMFQxeJRCKRaPbv5lOqlZoiatp65Vv3d9j0/AKHe3E93PEX3eUc7pkXM0ZMGw6XBin6gQblWzUsolpwKo+Xb7217s/hXlwP92zUZimHO76z57mFpbNYYjs/0kn51ohFNQPlW+8QRb4/h+vlal7M4Q5X/lIO91wEqLdlzy0W/UAeNkpUa959AlCHMar11vuv+3O4dtw/43C9LdtyDndcFbPFcLhlJ+fKikQikUgkEokmlRx1CuBgeNTWga7goKvBRmtdgVGttyEXPQ73XCDImKeceZzDVaMc7s4c9v2d4Eoc7iIFMGHCoz296GNvnugWCleOGJZvpbBI4g4BPIuN/nhpnK91QZrP4b6exnauzOEukotG9aGnr9OMNbI4k0DODSM8p6DrllOtNaNaldbfVNxm66jWG0R4ONU6HkIJc7jRb3C4izRaD9eTZ57oNo/Y03q4o+VbCZedwkZ/qmxWXdg1cbiLNnOj5vlPJGaeSCQSiUSiy7SIwx0FXX9NV+Vw769R1jnyzePT4pHDsg26WEs43NQW2u0wIJx+beFfk8O9v4x5LUPGXFTnX2/eP30gi+MBh1v/0plgf0GLOFw6DM8gqu1to5ozX4OvyeHeX+W5erg50GhdDYLNHoerpSy0PPPlmS+Sfb7s80UikUgkErGtZpkDiN6J7iwTAEmZA0BhmlIAqiz6psxvit0lqnyP7mx+wLxAU2rMC1i8huqynnlmG2SadpEbUVK+9RZT08afllcAMR+k6Iy+7Wn0FZAQ6NoNQNfIp1pNoV1HtR5gs2AqrXd33idr/U0vf7m1OB6Y1wD4Z83rC86uqLqs0lpvrMVGR2axNy0eJkzkcM6n5csmBMnpg9NeX8jh9lC6CxtGjmq98zq6aj3cX56DZhDVdA71Ukk9Dvdof+L7FNqOjVt0ThdwuLbp0FOtFnS9e63Wa9bD/cU5YHWA+bQEMGGPw827OmLj3gHIJqrqikQikUgkEolkn3/ZPj+ik3JoW7pp283tB/Hg+3zztj6xQw/s8z0F9vm7rhxOy9TZPhLbuTy2k7tDAOnEsjsETx47tmPUzKqHO3rGWiC2E7tTFWlavqfB5icSOefD+vMfTuP5g3M1hwHzFsA3O6UydzTvy70C5qPx/LfguZot7Lmaq4jnGznzvkZ/vNMz52oq94xy8XxFPwyV5di76TM8n0jpPgcQmS+D+wRAUuUAsDNNKQBV0ZfBSgHIqKncUVMMINmbL6IRgKLaAEgqOpn4Hh9JrXnc4pJZnBrzPpjF1Xq+4ZpBcIcGlFTb3mIapKds/wogtjMVA3jZZ/0lRZU4V4hEIpFI9ISaVyfL1KhNI2BZIapfGMT6zJu56VlS2YtfYqaFVxmLzCWn4TWptmUjZrNqI6Yceiq0fnVMlis+mAMbipfU+ttVGrzTK8ultRHXpIBD3bR8q2BtRBpk5Fi0xPXS6i6yGNdwvvtik0+tH3K4HjZaUIkPjo3eRxdzuGtSwKHjHC6/JKGojYtqHql8TGJ7GcaRXCkOeeb/hMPlVGui9SdYRfG7PVQv5nBXFWuzDp3D4Q6e+R09wxI3yE53UXCQuT22sHn2lf9TDjcEur7cfSN9MYe7qjeuU4vHOVzSxhs3fyMbHaTp5QUikUgkEj2Lrsrh2qbt3d8OH5TDnbmX4xxuYNzT3pG0hWBEIczhbiiJrdZ6O83hlqySrenlzoN4SA53pkYtzme9qGYCKIa0NFcznpureU/teJWXL1bl5TFyNafEczWHP/Ez1nRO6YiiQUDB5OfrAkD+rwagWsp216f5+aapZfn5us92j+pj7nq5pyxRoD18IAVQaIMPKEA1xwzA278aQNJ1D3M6Rz5m8bwyxWZaRCKRSCQSiURPqOtzuPfRNTlc88oTAF1XFZIYO2/Hf+ cX6HaebsDh3kfX5HArTmGuVeNnrHk/xIIeLvAnLKK6iMPVQQ739V6GN1q/8S8Qyj8JdMjhdm6Q1Wl03Du4cq1KXAptbqdFhdFcOVh2loo6BZDWBYCorBSAbZ0BiPclAJT7GEBe5wBUVUYA3j8Td4mqCPis+6b7iMyLyorMywDEZB5Z/MrN29UnFnvLhcZNg1ytaJAJ+ZhPy+BfSSBTJBKJRKLwLpJzuAlrUqaJc7j87wNN97RYjVk8bt4mPh13vO5piSemhTVFgUGKxkWIaso5XEe1Fg74pCZHtXYKeNM6A2Lb9H23pU/wqbP4MDRvHodb3Z0iu2Baco7mksWJ1u8AwhwuVjyi1SnM4X4A75zD/ZrF4d5HgXq47XIOl5o+9Uqx7NF6uBdwuKKgrsnh3u2Zn/6cw3XkcLHWaQnXw72AwxWFdU0O9z76YT1c2wsb93qn5bQe7gUcrkgkEolEIgB5EQFIixiAKnJqUgCSIgEQ8aa4SAGAmrJC/ZbFCkBabIYWk3mexao42dSoIqO/X+d8GIu3b2DTkg2nJTBTZlqmvdd3/NTaal0BirJcPu2p7DWgtP5WQKn1FsgoMYZzuOlvnV+Uc4srZjE6rWOGCfcWe2ptvtLHKieELN7ZM8E6AAetUzYt/yhfKbODVP+0VnbcUypsvtLT07rDqOY7sONJgYeJqOYvW3wuqnl0UU1PDnR9pKjmlkc1N2M1U6pZ3mvcSYZPrYSWRqv3AN70MQE2R/0GoNE1PWETIO50AaDUHQVCU0B1vxQWTL51DuBgzPvuzat0G1mLFbd4MPcdfcHLVvoo6uig3xTAl64BFLpTbpANazKDrHUDOy2T4TGtcyBqJfaPiFYG/9P7HxWdNnn/+JctjuZY7O+k+SBWuNE/9XFoWjA2LUu8JxKJRCLRM0g1LfGoWwBpVytA1YZqLQAkbdM35V0JYNM2CkDV/c5GWdVtAuDDmFcPzSOLo0/W5CnrKgCqOawmrkcWozRgcwkgbpq+Hq6xmE8LzVTEm+KvOdPi5vvpMx1+yuHeXx6He5jF4QaCJ9WKYjvk0JRXjvDq4QY43Il6uGfnuwZeJLbzYw73tyxexOF66rTO1nXU5l7rD5oDBOvhBjjc0Xq4U9PyrvXeodjPHdr5IYf7KxYv5XD9vQX9Kxr3Onac1qE9Hm3r4Y5xuEm9gxukm6kZ02LGTfcSiUQikeg5dAGH+9ubg+Ucrr/dWd27XcDiizncNc3UqnUBh7sWiz0O9wNnOFxP1erOZSKLvTLFYQ53h0kON7YsWidL/7wuqIe7Gotnc7ie9Oqoval6uEs43K3W2gV4RWeUa70D1HGMw91pnQMpPUkOa4gCZ9y8UuvMcbit/g5wuMMHfL26UyhdPdzWWVxovXWD5ByuchxuyjlcPu7aNYnO7jEJ5cwVAGTE4WasyVCtGQBE+Rrcmbww816ZxdGpxchOLc5WB2WYerh51FucetMSn0wLNcXeTKUnTSKRSCQSPbcM8LmEw13VDmGCw30kkcV2Dn7G4WacmBaFRMDnIg53TT+3ExzuI4ksjl1Bgp9wuKmrXCwb/TGFTxc8x+Gu6pE/weE+kmZENWdzuG8S1ZzxpOnUQg53TZrgcB9JudapY2N/yOGqTu8A1LqVFT6+YQCwkMNdn/njHO4jzcTpHFzO4QpnKxKJRCKR2122JQBVHxIAZfuGnmptEwBFWwBIDrUCos92bS9M72Tel7E4dSNKmvoxf9WXbe4GYTnctgCQtcThtqmblrTdR0C0Z01xQxxumwHYtlIi91xsJwM+OIf7FeRwP9YY2xnyk60LaNQPF9shpa5McQZUWlenNGLrKMzOUpgmpsU53L5JFNQF9XBXvPIbSsx0HO5jrnwAndYvZzjceBaHKyv/rKeX18Nd1WZtgsN9PF2Tw82kRK5IJBKJRFj4JWut5k8dH/t4EzJ1POy8L1lLFD3ZZ68l2Qsr1Gj2wqMqlL0Q0LzshUXBgn9PVlRxScbaOiMh4Yy1R1UgYy20TGdlrC18BD5Zks+SLOUV7gxGs5QfVYEs5fC452QpL1H+bCWkF5EpK3zoj5EpD6sAmRJ66M8iU5Yt/SKCSCQSiUR/crezTQAgywEg2SoAyLO+Kd7G4qS1b5By1c9UTjTv2+LdDs232m6e6g03p/OLBu+Le2oSvGHdeqFYxNF/w11KTNMSiJ4H3Z0X1RStWNeMasbPg+7O+5IlWvOG9Zpfsuq1Ha9xQ78BmM5eEK1/Dq+TvSDzLRKJRKI/pykOV/QwL7qcw71gx0RLoGBg89/WBIcrepi9PudwL9DOlRtNLN7551f+yxkOV/RIK99xuJf8yni2lW+Bz1oBKJoMQFwTh1tLIP+h9q0NcbgXVviNaL6pF7MERCKRSCR6+J0h+xN/CGR9bkXXWQ9/ed23uoTLXuh0DuCgKwC57iSe+ajK9L/L8m7MEniC7AUP+AxkrIkeUvWlUOHzZKwlHPgMcLiih9TFVZKIw42OT5Cl7AGfAQ5X9JC6ePJoCRiaVyQSiUSiv7HR3yqEOVzRUy2BKE/7JfAEMkcatVpvBhyu6LmWQK11ZpfAM2g8qinCUy0BOqPweU4XVB3/ksU5XNGTyJxeW+gufq4TZfnXaoEwn1KBJSASiUQi0R8SL0VmKsSJnnEJbD6fC0Mx5Sd5VVARnnEJHJ4sTytzJYcpqinQ7dPphUc1n0hVVwDIu08A6tClshKeTrQEsq6Rra5IJBKJRCLR39FBlwAK3UZA0j1yJU2RaIGGGWsHcYnoKRTgcEWiZ1CAwxWJRCKRSCT6Sxt9zuGKRM8ij8MViZ5GOY9qikRPI9XpPYBKapyLnm6/Qz8B4giRSCQSiUR/9BV3nwBIqhwAdqXsekTPoVTrfwA64XBFzyXhcEVPKuFwRSKRSCQSiUSivyqPw210KR4RPYc4hyuVI0TPo0A9XJHoCeTXw93F4hHRqP4DvgZGcD3pPlgAAAAASUVORK5CYII=",
    styled: {
      width: "761px",
      height: "399px"
    },
    className: "absolute m-auto top-0 bottom-0"
  });
};

const {
  Components: Components$3
} = globalThis.ark;
const {
  Box: Box$2
} = Components$3;
const Layout = ({
  children
}) => {
  return /*#__PURE__*/React__default['default'].createElement(Box$2, {
    as: "section",
    className: "flex-1 flex flex-col relative",
    styled: {
      color: "white",
      background: "#2B2B37 radial-gradient(ellipse 210px 210px at 100% 40%, rgba(110, 14, 125, 0.2), #2B2B37)"
    }
  }, /*#__PURE__*/React__default['default'].createElement("header", {
    className: "flex flex-wrap items-center p-5"
  }, /*#__PURE__*/React__default['default'].createElement("svg", {
    width: "128",
    height: "128",
    viewBox: "0 0 128 128",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React__default['default'].createElement("g", {
    id: "ChangeNOW-logo-transparent"
  }, /*#__PURE__*/React__default['default'].createElement("g", {
    id: "Group"
  }, /*#__PURE__*/React__default['default'].createElement("path", {
    id: "NOW",
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M25.6804 91.258H22.4865V66.1474H25.6266L39.802 85.8635H39.9635V66.1474H43.1574V91.258H40.0173L25.8419 71.6115H25.6804V91.258ZM60.3341 65.7297C67.673 65.7297 72.2666 70.7414 72.2666 78.7114C72.2666 86.6814 67.673 91.6757 60.3341 91.6757C52.9952 91.6757 48.4017 86.6814 48.4017 78.7114C48.4017 70.7414 52.9952 65.7297 60.3341 65.7297ZM60.3341 68.6184C55.0408 68.6184 51.7213 72.5164 51.7213 78.7114C51.7213 84.889 55.0408 88.787 60.3341 88.787C65.6275 88.787 68.947 84.889 68.947 78.7114C68.947 72.5164 65.6275 68.6184 60.3341 68.6184ZM90.9864 71.3331L85.0112 91.258H81.9609L74.9091 66.1474H78.2824L83.4681 86.6466H83.6117L89.4433 66.1474H92.709L98.5406 86.6466H98.6842L103.87 66.1474H107.243L100.191 91.258H97.1411L91.1659 71.3331H90.9864Z",
    fill: "#3BEE81"
  }), /*#__PURE__*/React__default['default'].createElement("path", {
    id: "change",
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M32.7601 46.3002H30.5858C30.306 44.8275 29.0854 43.6622 27.0255 43.6622C24.635 43.6622 23.0074 45.6599 23.0074 48.7078C23.0074 51.8453 24.6604 53.7534 27.0509 53.7534C28.9582 53.7534 30.2297 52.8569 30.6112 51.1922H32.7855C32.4168 53.8814 30.1662 55.7383 27.0382 55.7383C23.2744 55.7383 20.7568 53.049 20.7568 48.7078C20.7568 44.469 23.2617 41.6773 27.0127 41.6773C30.4078 41.6773 32.4804 43.8799 32.7601 46.3002ZM35.4702 55.6102V36.3243H37.6827V44.0464H37.7335C38.5855 42.484 39.9842 41.6773 42.0822 41.6773C45.0831 41.6773 46.9141 43.7262 46.9141 46.7997V55.6102H44.7016V47.1967C44.7016 44.994 43.5954 43.6622 41.421 43.6622C39.1068 43.6622 37.6827 45.2501 37.6827 47.6705V55.6102H35.4702ZM54.7612 53.8046C56.9991 53.8046 58.6394 52.3447 58.6394 50.3598V49.2456L55.0536 49.4761C52.9937 49.6042 51.9256 50.3598 51.9256 51.6916C51.9256 52.9722 53.0319 53.8046 54.7612 53.8046ZM54.2907 55.7383C51.506 55.7383 49.6623 54.1247 49.6623 51.6788C49.6623 49.3097 51.4679 47.9138 54.7993 47.7089L58.6394 47.4784V46.3259C58.6394 44.6098 57.5204 43.6622 55.4987 43.6622C53.9093 43.6622 52.7267 44.4818 52.4597 45.788H50.3362C50.3998 43.4573 52.6504 41.6773 55.5241 41.6773C58.7665 41.6773 60.8519 43.4189 60.8519 46.1338V55.6102H58.7538V53.2155H58.703C57.9273 54.7522 56.2107 55.7383 54.2907 55.7383ZM64.2232 55.6102V41.8053H66.3085V44.0464H66.3593C67.224 42.484 68.5845 41.6773 70.708 41.6773C73.7216 41.6773 75.4636 43.6238 75.4636 46.7613V55.6102H73.2511V47.1454C73.2511 44.8916 72.2084 43.6622 70.0468 43.6622C67.7962 43.6622 66.4356 45.2245 66.4356 47.5937V55.6102H64.2232ZM84.3788 53.6253C86.782 53.6253 88.4096 51.6147 88.4096 48.6566C88.4096 45.6856 86.782 43.6622 84.3788 43.6622C81.9883 43.6622 80.4243 45.6343 80.4243 48.6566C80.4243 51.666 81.9883 53.6253 84.3788 53.6253ZM84.4169 60.5406C81.3144 60.5406 79.0637 59.0294 78.7459 56.7372H81.0474C81.378 57.8897 82.7385 58.6068 84.5441 58.6068C86.9092 58.6068 88.4096 57.3647 88.4096 55.4053V53.2411H88.3587C87.4941 54.7394 85.8792 55.6102 83.9592 55.6102C80.4879 55.6102 78.1609 52.8313 78.1609 48.6566C78.1609 44.4434 80.4879 41.6773 84.01 41.6773C85.9428 41.6773 87.5576 42.5353 88.4732 44.0464H88.5113V41.8053H90.6221V55.2261C90.6221 58.53 88.2697 60.5406 84.4169 60.5406ZM99.5246 43.6366C97.3756 43.6366 95.8244 45.2117 95.6718 47.5424H103.212C103.161 45.1989 101.686 43.6366 99.5246 43.6366ZM103.161 51.666H105.348C104.967 54.0351 102.589 55.7383 99.6644 55.7383C95.8116 55.7383 93.383 53.0362 93.383 48.759C93.383 44.4818 95.8244 41.6773 99.5627 41.6773C103.225 41.6773 105.514 44.2769 105.514 48.4517V49.3225H95.6718V49.4505C95.6718 52.0758 97.2739 53.779 99.7153 53.779C101.432 53.779 102.767 52.9594 103.161 51.666Z",
    fill: "white"
  })))), /*#__PURE__*/React__default['default'].createElement(Box$2, {
    className: "sm:block hidden",
    styled: {
      width: "1px",
      height: "40px",
      background: "#3D3D70"
    }
  }), /*#__PURE__*/React__default['default'].createElement(Box$2, {
    className: "sm:block hidden ml-4 text-theme-secondary-text"
  }, "Cryptocurrency Exchange")), /*#__PURE__*/React__default['default'].createElement(Box$2, {
    className: "flex-1 flex items-center justify-center px-3 z-5",
    styled: {
      background: "radial-gradient(ellipse 390px 390px at 0% 40%, rgba(109, 107, 217, 0.3), #2B2B37, transparent)"
    }
  }, /*#__PURE__*/React__default['default'].createElement(ImageWorld, null), /*#__PURE__*/React__default['default'].createElement("div", {
    className: "lg:w-4/5 w-full lg:p-2 p-1 flex flex-col lg:flex-row p-5 z-20"
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: "w-3/5"
  }, /*#__PURE__*/React__default['default'].createElement(Box$2, {
    as: "h1",
    className: "text-5xl font-bold",
    styled: {
      color: "white"
    }
  }, "Limitless exchange"), /*#__PURE__*/React__default['default'].createElement(Box$2, {
    as: "p",
    className: "mb-8 text-2xl",
    styled: {
      color: "#5c5780"
    }
  }, "Fast coin swaps free of custody"), /*#__PURE__*/React__default['default'].createElement("div", {
    className: "mb-4 inline-block capitalize relative"
  }, /*#__PURE__*/React__default['default'].createElement(Box$2, {
    as: "p",
    className: "text-lg font-bold",
    styled: {
      color: "#FFC24A"
    }
  }, "What you see is what you get"), /*#__PURE__*/React__default['default'].createElement(Box$2, {
    as: "img",
    className: "absolute w-4 transform -translate-y-12 translate-x-5 right-0",
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAWCAYAAADafVyIAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGPSURBVHgBrVRLUsJAEO2ecaMrPIHhBMraKgk7YJPcADmBeALxBMAN9AasxF1Ey703MJ7ArLCkTNpOTCzzmWTG4q0y/Zvp168DYADy+hY9D49McoRJMEh04QvGJil7JsGAYgQQBUYpuoExPSDFa3KQYOHp3ZtOnj5FMT0ZDGgymYHz+4XU1U3SoihHT4Zwc4i9h8Z56HUghV227Z+DBpA8uwXyYMbvtNRh4oT9rYLRZ5tfU9rnLi8TihIKBE4BcQS7wZKLj2MKczOgx8GEb57Bf0EQMCfXeLaaZ6bSkNNuPO7GAhMQ0xVRD3v3/l+zUkW0Hs7ZewF6xRcQfUyrVFUrU1oPbhrnwsWxu5qo3PUyRWj+cyIc17sVIM9l+W7foRkBK6atWjp1B3Lrlm/lQVJJ+/EeuaoydRQ5hfOSB9mJlcKX3BZuVs6pkqIcPRXaTszJzoirdMOVNFV3ID/ttPgLRFGnWDx5WWwLw05KmZImBUXo/Gh7U1qcXBT7WKJtfsiCj9q/cKCnvg2GYMoqO/gGeuWYpiw2NTYAAAAASUVORK5CYII="
  }), /*#__PURE__*/React__default['default'].createElement(Box$2, {
    as: "img",
    className: "absolute w-2 transform top-0 translate-x-8 right-0",
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAWCAYAAADafVyIAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGPSURBVHgBrVRLUsJAEO2ecaMrPIHhBMraKgk7YJPcADmBeALxBMAN9AasxF1Ey703MJ7ArLCkTNpOTCzzmWTG4q0y/Zvp168DYADy+hY9D49McoRJMEh04QvGJil7JsGAYgQQBUYpuoExPSDFa3KQYOHp3ZtOnj5FMT0ZDGgymYHz+4XU1U3SoihHT4Zwc4i9h8Z56HUghV227Z+DBpA8uwXyYMbvtNRh4oT9rYLRZ5tfU9rnLi8TihIKBE4BcQS7wZKLj2MKczOgx8GEb57Bf0EQMCfXeLaaZ6bSkNNuPO7GAhMQ0xVRD3v3/l+zUkW0Hs7ZewF6xRcQfUyrVFUrU1oPbhrnwsWxu5qo3PUyRWj+cyIc17sVIM9l+W7foRkBK6atWjp1B3Lrlm/lQVJJ+/EeuaoydRQ5hfOSB9mJlcKX3BZuVs6pkqIcPRXaTszJzoirdMOVNFV3ID/ttPgLRFGnWDx5WWwLw05KmZImBUXo/Gh7U1qcXBT7WKJtfsiCj9q/cKCnvg2GYMoqO/gGeuWYpiw2NTYAAAAASUVORK5CYII="
  })), /*#__PURE__*/React__default['default'].createElement("div", null, /*#__PURE__*/React__default['default'].createElement("p", {
    className: "mb-3 text-sm text-theme-secondary-text"
  }, "Great rating on"), /*#__PURE__*/React__default['default'].createElement("a", {
    href: "https://www.trustpilot.com/review/changenow.io",
    target: "_blank",
    className: "inline-block"
  }, /*#__PURE__*/React__default['default'].createElement("img", {
    src: "data:image/png;base64,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"
  })))), /*#__PURE__*/React__default['default'].createElement("div", {
    className: "flex-1"
  }, children))), /*#__PURE__*/React__default['default'].createElement(Box$2, {
    as: "footer",
    className: "py-6 w-100 text-center text-xl text-white capitalize font-bold",
    styled: {
      background: "linear-gradient(270deg, #CDBAFF 0%, #5E5AE2 97.43%)"
    }
  }, "Our customers received The displayed amount in 98.7% of all the exchanges!"));
};

const swapReducer = (state, action) => {
  switch (action.type) {
    case "currencies":
      {
        return { ...state,
          currencies: action.currencies,
          from: action.currencies.find(currency => currency.ticker === "btc"),
          to: action.currencies.find(currency => currency.ticker === "ark")
        };
      }

    case "from":
      {
        return { ...state,
          from: action.from
        };
      }

    case "to":
      {
        return { ...state,
          to: action.to
        };
      }

    case "toggleCurrencies":
      {
        return { ...state,
          from: state.to,
          to: state.from
        };
      }

    case "amount":
      {
        return { ...state,
          amount: action.amount
        };
      }

    case "estimatedAmount":
      {
        return { ...state,
          estimatedAmount: action.estimatedAmount
        };
      }

    case "recipient":
      {
        return { ...state,
          recipient: action.recipient
        };
      }

    case "refundAddress":
      {
        return { ...state,
          refundAddress: action.refundAddress
        };
      }
  }
};

const useBuilder = () => React__default['default'].useReducer(swapReducer, {
  currencies: [],
  amount: 1
});

const {
  Components: Components$4
} = globalThis.ark;
const {
  Box: Box$3,
  Tabs,
  TabPanel
} = Components$4;
const MainPage = () => {
  const {
    getAllCurrencies
  } = useExchange();
  const [state, dispatch] = useBuilder();
  const [isLoading, setIsLoading] = React__default['default'].useState(false);
  const [activeTab, setActiveTab] = React__default['default'].useState(1);
  const fetchCurrencies = React__default['default'].useCallback(async () => {
    const currencies = await getAllCurrencies();
    dispatch({
      type: "currencies",
      currencies
    });
  }, []);
  React__default['default'].useEffect(() => {
    const initialize = async () => {
      setIsLoading(true);
      await fetchCurrencies();
      setIsLoading(false);
    };

    initialize();
  }, []);
  return /*#__PURE__*/React__default['default'].createElement(Layout, null, isLoading ? /*#__PURE__*/React__default['default'].createElement("span", null, "Loading...") : /*#__PURE__*/React__default['default'].createElement(Tabs, {
    activeId: activeTab
  }, /*#__PURE__*/React__default['default'].createElement(TabPanel, {
    tabId: 1
  }, /*#__PURE__*/React__default['default'].createElement(FormStep, {
    state: state,
    dispatch: dispatch
  })), /*#__PURE__*/React__default['default'].createElement(TabPanel, {
    tabId: 2
  }, /*#__PURE__*/React__default['default'].createElement(RecipientStep, null))));
};

var index = (api => {
  api.launch().render( /*#__PURE__*/React__default['default'].createElement(WalletProvider, {
    api: api
  }, /*#__PURE__*/React__default['default'].createElement(MainPage, null)));
});

exports.default = index;
