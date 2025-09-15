import React from 'react';
import PropTypes from 'prop-types';

const colorClasses = {
  primary: {
    icon: 'bg-gradient-to-br from-primary-500 to-primary-600 text-white',
    border: 'border-primary-200',
    change: 'text-primary-600'
  },
  success: {
    icon: 'bg-gradient-to-br from-green-500 to-green-600 text-white',
    border: 'border-green-200',
    change: 'text-green-600'
  },
  warning: {
    icon: 'bg-gradient-to-br from-yellow-500 to-yellow-600 text-white',
    border: 'border-yellow-200',
    change: 'text-yellow-600'
  },
  danger: {
    icon: 'bg-gradient-to-br from-red-500 to-red-600 text-white',
    border: 'border-red-200',
    change: 'text-red-600'
  },
  info: {
    icon: 'bg-gradient-to-br from-blue-500 to-blue-600 text-white',
    border: 'border-blue-200',
    change: 'text-blue-600'
  }
};

const StatCard = ({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  color = 'primary',
  loading = false 
}) => {
  const colors = colorClasses[color];

  if (loading) {
    return (
      <div className="stat-card animate-pulse">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-8 bg-gray-200 rounded mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-20"></div>
          </div>
          <div className="w-14 h-14 bg-gray-200 rounded-2xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`stat-card relative overflow-hidden ${colors.border}`}>
      {/* Top colored line */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${colors.icon}`}></div>
      
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-gray-600 mb-2">{title}</h3>
          <p className="text-3xl font-bold text-gray-900 mb-2">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
          
          {change && (
            <div className="flex items-center gap-1">
              <span className={`text-sm font-medium ${
                change.type === 'increase' ? 'text-green-600' : 'text-red-600'
              }`}>
                {change.type === 'increase' ? '+' : '-'}{Math.abs(change.value)}%
              </span>
              <span className="text-sm text-gray-500">vs last month</span>
            </div>
          )}
        </div>
        
        <div className={`
          w-14 h-14 rounded-2xl flex items-center justify-center
          shadow-lg transition-transform duration-200 hover:scale-105
          ${colors.icon}
        `}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
};

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  change: PropTypes.shape({
    value: PropTypes.number.isRequired,
    type: PropTypes.oneOf(['increase', 'decrease']).isRequired
  }),
  icon: PropTypes.elementType.isRequired,
  color: PropTypes.oneOf(['primary', 'success', 'warning', 'danger', 'info']),
  loading: PropTypes.bool
};

StatCard.defaultProps = {
  color: 'primary',
  loading: false,
  change: null
};

export default StatCard;
