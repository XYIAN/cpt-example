'use client';

interface Member {
  id: number;
  firstName: string;
  lastName: string;
  email: string | null;
  homePhone: string | null;
  mobilePhone: string | null;
  address1: string | null;
  address2: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  zip4: string | null;
  productName: string | null;
  datePurchased: string | null;
  paidAmount: number | null;
  coveredWeeks: number | null;
  lastStateWorked: string | null;
}

interface MemberTableProps {
  members: Member[];
  onEdit: (member: Member) => void;
}

export default function MemberTable({ members, onEdit }: MemberTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Contact
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Address
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Product Details
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {members.map((member) => (
            <tr key={member.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{member.firstName} {member.lastName}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{member.email}</div>
                <div className="text-sm text-gray-500">
                  {member.mobilePhone && <div>M: {member.mobilePhone}</div>}
                  {member.homePhone && <div>H: {member.homePhone}</div>}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {member.address1}
                  {member.address2 && <div>{member.address2}</div>}
                </div>
                <div className="text-sm text-gray-500">
                  {member.city}, {member.state} {member.zip}{member.zip4 && `-${member.zip4}`}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{member.productName}</div>
                {member.datePurchased && (
                  <div className="text-sm text-gray-500">
                    Purchased: {new Date(member.datePurchased).toLocaleDateString()}
                  </div>
                )}
                {member.paidAmount && (
                  <div className="text-sm text-gray-500">
                    Amount: ${member.paidAmount.toFixed(2)}
                  </div>
                )}
                {member.coveredWeeks && (
                  <div className="text-sm text-gray-500">
                    Covered Weeks: {member.coveredWeeks}
                  </div>
                )}
                {member.lastStateWorked && (
                  <div className="text-sm text-gray-500">
                    Last State: {member.lastStateWorked}
                  </div>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => onEdit(member)}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 