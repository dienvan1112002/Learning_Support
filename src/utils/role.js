import HeaderKhach from "src/components/Header/HeaderKhach/Header";
import HeaderDkgv from "src/components/Header/HeaderDkgv/HeaderDkgv";
import HeaderGv from "src/components/Header/HeaderGv/HeaderGv";
import HeaderHv from "src/components/Header/HeaderHv/HeaderHv";

const roleHeaders = {
    '': <HeaderKhach />,
    'student': <HeaderHv />,
    'instructor': <HeaderGv />,
    'admin': <HeaderDkgv />
};

export default roleHeaders;
