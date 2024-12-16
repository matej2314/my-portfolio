import { Icon } from "@iconify/react/dist/iconify.js"

export default function FittedIcon({ difficulty }) {
    if (difficulty === 'junior') {
        return <Icon icon="healthicons:low-level" width={30} height={30} className="text-blue-600" />;
    } else if (difficulty === 'mid') {
        return <Icon icon="healthicons:medium-level" width={30} height={30} className="text-green-600" />;
    } else if (difficulty === 'senior') {
        return <Icon icon="healthicons:high-level" width={30} height={30} className="text-red-600" />;
    } else if (difficulty === 'newbie') {
        return <Icon icon="mdi:kids-room" width={32} height={32} className="text-gray-300" />;
    }
    return null;
};