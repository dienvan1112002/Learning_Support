import HeaderKhach from "src/components/Header/HeaderKhach/Header";
import HeaderDkgv from "src/components/Header/HeaderDkgv/HeaderDkgv";
import HeaderHv from "src/components/Header/HeaderHv/HeaderHv";

const roleHeaders = {
    '': <HeaderKhach />,
    'student': <HeaderHv />,
    'instructor': <HeaderHv />,
    'admin': <HeaderDkgv />
};

export default roleHeaders;
