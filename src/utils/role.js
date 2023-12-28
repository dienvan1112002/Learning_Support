import HeaderKhach from "src/components/Header/HeaderKhach/Header";
import HeaderDkgv from "src/components/Header/HeaderDkgv/HeaderDkgv";
import HeaderHv from "src/components/Header/HeaderHv/HeaderHv";
import HeaderGv from "src/components/Header/HeaderGv/HeaderGv";

const roleHeaders = {
    '': <HeaderKhach />,
    'student': <HeaderHv />,
    'instructor': <HeaderGv />,
    'admin': <HeaderDkgv />
};

export default roleHeaders;
